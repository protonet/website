class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.string :first_name
      t.string :last_name
      t.string :express_token

      t.timestamps
    end
  end

  def self.down
    drop_table :orders
  end
end
