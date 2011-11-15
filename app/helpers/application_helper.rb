module ApplicationHelper
  
  def clean(spec)
    spec.is_a?(Array) ? spec.join(", ") : spec
  end
  
end
