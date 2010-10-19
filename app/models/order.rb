class Order < ActiveRecord::Base
  has_many :transactions, :class_name => "OrderTransaction"

  def self.process(token)
    order = nil
    if !token.blank?
      details = EXPRESS_GATEWAY.details_for(token)
      order = find details.params["invoice_id"].to_i
      order.express_token = token
      order.express_payer_id = details.payer_id
      order.first_name = details.params["first_name"]
      order.last_name = details.params["last_name"]
      order.city_name = details.params["city_name"]
      order.country_name = details.params["country_name"]
      order.state_or_province = details.params["state_or_province"]
      order.street1 = details.params["street1"]
      order.street2 = details.params["street2"]
      order.postal_code = details.params["postal_code"]
    end
    order
  end

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

  def express_payer_id=(payer_id)
    # dummy --> TODO: extend method with functionality!
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
