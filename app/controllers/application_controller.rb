class ApplicationController < ActionController::Base
  
  before_filter :authenticate
  
  protect_from_forgery
  
  def base_node
    {
      :cpu => "Dual Core",
      :cpu_detail => "Intel D525",
      :ram => "1GB",
      :max_ram => "4GB",
      :sound => ["Intel HD Audio"],
      :lan => "Gigabit Etherent(1000Mbit)",
      :usb => ["4x USB2.0"],
      :sata => ["2x SATA 3GB/s (1 Used)"],
      :harddisk => ["250GB"],
      :max_drives => "2 Drives",
      :extension => ["PCI Slot", "Mini PCIe (Used by Wireless Adapter)"],
      :technical_extensions => ["Serial Port", "Parallel Port", "2x PS/2", "More internal USBs (2x USB 2.0)"],
      :video => ["VGA"],
      :wireless => ["Wireless N"],
      :power_usage => "ca. 30W",
      :os => "protonet OS",
      :price_private => "EUR 499,-",
      :price_business => "EUR 429,-",
      :support => [""]
    }
  end
  helper_method :base_node
  
  def power_node
    {
      :cpu => "Dual Core",
      :cpu_detail => "AMD E-350",
      :ram => "4GB",
      :max_ram => "8GB",
      :sound => ["Digital Audio Out (S/PDIF)", "DTS", "Analog"],
      :lan => "Gigabit Etherent(1000Mbit)",
      :usb => ["2x USB3.0", "4x USB2.0"],
      :sata => ["5x SATA 6Gb/s (2 Used)", "1x eSATA 6Gb/s"],
      :max_drives => "6 Drives",
      :harddisk => ["2x 2TB"],
      :extension => ["PCIe 2.0 x16 Slot"],
      :technical_extensions => ["Serial Port", "Parallel Port", "2x PS/2", "More internal USBs (2x USB 3.0, 4x USB 2.0)"],
      :wireless => ["Wireless N"],
      :video => ["HDMI", "DVI"],
      :os => "protonet OS",
      :power_usage => "ca. 30W",
      :price_private => "EUR 799,-",
      :price_business => "EUR 679,-",
      :support => [""]
    }
  end
  helper_method :power_node
  
  def business_node
    power_node.merge({
      :price_private => "EUR 1999,-",
      :price_business => "EUR 1679,-",
      :support => ["All incl. Support"]
    })
  end
  helper_method :business_node

  protected

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "protonet" && password == "geheim"
    end
  end
  
end
