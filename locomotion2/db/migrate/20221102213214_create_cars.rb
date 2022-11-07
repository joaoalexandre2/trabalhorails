class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.string :model
      t.integer :year
      t.integer :brand_id
      t.timestamps
    end
  end
end
