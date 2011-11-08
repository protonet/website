class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def base_node
    {
      :cpu => "Dual Core (Intel D525)"
      :ram => "1GB",
      :max_ram => "4GB",
      :sound => ["Intel High Definition Audio"],
      :lan => "Gigabit Etherent(1000Mbit)",
      :usb => ["4x USB2.0"],
      :sata => ["2x SATA 3GB/s (1 Used)"],
      :harddisk => ["1x 500GB"],
      :extension => ["PCI Slot", "Mini PCIe (Used by Wireless Adapter)"],
      :technical_extensions => ["Serial Port", "Parallel Port", "2x PS/2", "More internal USBs"],
      :wireless => ["Wireless N"],
      :power_usage => "ca. 30W"
      :price_private => "€499,-",
      :price_business => "€429,-",
      :support => [""]
    }
  end
  
  def power_node
    {
      :cpu => "Dual Core (AMD E-350)",
      :ram => "4GB",
      :max_ram => "8GB",
      :sound => ["Digital Audio Out (S/PDIF)", "DTS", "Analog"],
      :lan => "Gigabit Etherent(1000Mbit)",
      :usb => ["2x USB3.0", "4x USB2.0"],
      :sata => ["5x SATA 6Gb/s (2 Used)", "1x eSATA 6Gb/s"],
      :harddisk => ["2x 2TB"],
      :extension => ["PCIe 2.0 x16 Slot"],
      :technical_extensions => ["Serial Port", "Parallel Port", "2x PS/2", "More internal USBs (2x USB 3.0, 4x USB 2.0)"],
      :wireless => ["Wireless N"],
      :power_usage => "ca. 30W"
      :price_private => "€799,-",
      :price_business => "€679,-",
      :support => [""]
    }
  end
  
  def business_node
    power_node.merge({
      :price_private => "€1999,-",
      :price_business => "€1679,-",
      :support => [""]
    })
  end
  
end
