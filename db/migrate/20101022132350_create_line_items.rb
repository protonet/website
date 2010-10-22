class CreateLineItems < ActiveRecord::Migration
  def self.up
    create_table :line_items do |t|
      t.string :type
      t.integer :options_mask
      t.references :order
      t.decimal :amount, :precision => 10, :scale => 2

      t.timestamps
    end
  end

  def self.down
    drop_table :line_items
  end
end
