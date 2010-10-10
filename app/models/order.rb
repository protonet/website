class Order < ActiveRecord::Base
  has_many :transactions, :class_name => "OrderTransaction"

  def purchase
    response = process_purchase
    transactions.create!(:action => "purchase", :amount => price_in_cents, :response => response)
    response.success?
  end

  def express_token=(token)
    write_attribute(:express_token, token)
    if new_record? && !token.blank?
      details = EXPRESS_GATEWAY.details_for(token)
      self.express_payer_id = details.payer_id
      self.first_name = details.params["first_name"]
      self.last_name = details.params["last_name"]
    end
  end

  def price_in_cents
    (230*100).round
  end

  private

  def process_purchase
    EXPRESS_GATEWAY.purchase(price_in_cents, express_purchase_options)
  end

  def express_purchase_options
    {
      :ip => ip_address,
      :token => express_token,
      :payer_id => express_payer_id
    }
  end

end
