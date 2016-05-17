class Api::V1::BurndownChartsController < Api::BaseController

  def show
    @sprint = Sprint.find params[:id]
    estimate_data = []
    actual_data = []
    work_hour = 8 * @sprint.assignees.size

    @sprint.activities.each do |activity|
      9.times do |index|
        sum += activity.log_works.where(day: index +1).remaining_time
      end
      actual_data << sum
    end

    9.times do |index| 
      remaining -= work_hour + lost_hour(@sprint)
      estimate_data << remaining
    end

    chart_data = {
      estimate_data: estimate_data, actual_data: actual_data
    }

    respond_with chart_data
  end

  private
  def lost_hour sprint
    9.times do |index|
      sum_lost_hour += sprint.time_logs.where(day: index+1).lost_hour
    end
    sum_lost_hour
  end

end
