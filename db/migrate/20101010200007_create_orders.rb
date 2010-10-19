class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.string :first_name
      t.string :last_name
      t.string :city_name
      t.string :country_name
      t.string :state_or_province
      t.string :street1
      t.string :street2
      t.string :postal_code
      t.decimal :amount, :precision => 10, :scale => 2
      t.integer :basic
      t.integer :power
      t.integer :extreme
      t.string :express_token
      t.string :express_payer_id
      t.boolean :processed, :default => false

      t.timestamps
    end
  end

  def self.down
    drop_table :orders
  end
end
