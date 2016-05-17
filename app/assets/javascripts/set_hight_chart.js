var chart;
var estimate_data;
var actual_data;

$(document).on("page:change", function (){
  var burndown_chart = $("#burndown_chart");
  if (burndown_chart.length > 0){
    $.ajax({
      type: "get",
      url: $("#burndown_chart").data("chartData"),
      dataType: "json",
      success: function(data) {
        estimate_data = data.estimate_data;
        actual_data = data.actual_data;
        initChart();
      }
    });  
  }
});

function initChart(){
  chart = new Highcharts.Chart({
    chart: {
      renderTo: "burndown_chart",
      height: 300,
      width: 600
    },
    title: {
      text: "Burndown Chart"
    },
    colors: ["#BF0622", "#5559D6"],
    xAxis: {
      min:1,
      title: {text: "Working days"}
    },
    yAxis: {
      title: {text: "Estimate time"},
      lineWidth: 1
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,
      useHTML: true,
      hideDelay: 10,
      borderColor: "#7cb5ec",
      headerFormat: "<div style='text-align: center'>Day" + ": <b>{point.key}</b></div>",
      valueSuffix: " (h)",

    },
    legend: {
      align: "right",
      layout: "vertical"
    },
    series: [{
      name:"Actual",
      data: actual_data
      }]
  });

  chart.addSeries({
    name: "Estimate",
    data: estimate_data
  });
}