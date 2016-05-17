Fabricator :time_log do
  assignee_id
  sprint_id
  work_date
  lost_hour {Faker::Number.between(0, 6)}
end
