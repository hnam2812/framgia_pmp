class CreateLogWorks < ActiveRecord::Migration
  def change
    create_table :log_works do |t|
      t.integer :remaining_time
      t.integer :day
      t.timestamps null: false
    end
  end
end
