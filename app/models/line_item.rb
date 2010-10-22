class LineItem < ActiveRecord::Base
  OPTIONS = %w[ram lol]

  def options=(options)
    self.options_mask = (options & OPTIONS).map { |r| 2**OPTIONS.index(r) }.sum
  end

  def options_array
    array = Array.new
    OPTIONS.each do |option|
      array << self.has?(option) 
    end 
    array
  end 

  def options
    OPTIONS.reject do |r|
      ((options_mask || 0) & 2**OPTIONS.index(r)).zero?
    end
  end

  def has?(option)
    options.include?(option.to_s)
  end
end
