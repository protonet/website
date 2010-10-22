class OrdersController < ApplicationController
  def express
    basic   = params[:basic].to_i
    power   = params[:power].to_i
    extreme = params[:extreme].to_i
    amount = 399 * basic + 499 * power + 599 * extreme
    redirect_to root_url if amount <= 0
    order = Order.new(
      :amount => amount,
      :basic => basic,
      :power => power,
      :extreme => extreme)
    order.save
    response = EXPRESS_GATEWAY.setup_purchase(
      order.price_in_cents,
      :order_id          => order.id,
      :items             => order.items,
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

  def update
    @order = Order.find params[:id]
    @order.purchase
    redirect_to order_path(@order.id)
  end

  def show
    @order = Order.find params[:id]
  end

end
