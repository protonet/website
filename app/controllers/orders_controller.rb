class OrdersController < ApplicationController
  def express
    basic   = params[:basic].to_i
    power   = params[:power].to_i
    extreme = params[:extreme].to_i
    items = get_items(basic, power, extreme)
    logger.info items.to_json
    amount = 399 * basic + 499 * power + 599 * extreme
    response = EXPRESS_GATEWAY.setup_purchase(
      amount * 100,
      :items             => items,
      :ip                => request.remote_ip,
      :return_url        => new_order_url,
      :cancel_return_url => products_url
    )
    logger.info response.params.to_json
    redirect_to EXPRESS_GATEWAY.redirect_url_for(response.token)
  end

  def new
    @order = Order.new(:express_token => params[:token])
  end

  private
  def get_items(basic, power, extreme)
    items = []
    items << { :name => 'Protonet Basic',
      :quantity => basic,
      :description => 'Basic setup',
      :amount => 399 * 100 } if basic > 0
    items << { :name => 'Protonet Power',
      :quantity => power,
      :description => 'Power setup',
      :amount => 499 * 100 } if power > 0
    items << { :name => 'Protonet Extreme',
      :quantity => extreme,
      :description => 'Extreme setup',
      :amount => 599 * 100 } if extreme > 0
    items
  end
end
