class OrdersController < ApplicationController
  def express
    basic   = params[:basic].to_i
    power   = params[:power].to_i
    extreme = params[:extreme].to_i
    items = get_items(basic, power, extreme)
    amount = 399 * basic + 499 * power + 599 * extreme
    redirect_to root_url if amount <= 0
    order = Order.new(
      :basic => basic,
      :power => power,
      :extreme => extreme)
    order.save
    response = EXPRESS_GATEWAY.setup_purchase(
      amount * 100,
      :order_id          => order.id,
      :items             => items,
      :ip                => request.remote_ip,
      :return_url        => new_order_url,
      :cancel_return_url => products_url
    )
    if response.success?
      redirect_to EXPRESS_GATEWAY.redirect_url_for(response.token)
    else
      flash[:error] = "An error occurred contacting the PayPal Gateway"
      redirect_to root_url
    end
  end

  def new
    # invoice_id is the 
    @order = Order.process(params[:token])
    @order.save
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
