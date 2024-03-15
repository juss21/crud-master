# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'
  config.vm.box = "ubuntu/mantic64"
  config.vm.provision "file", source: ".env", destination: ".env", :run => 'always'
  config.vm.provision "shell", path: "scripts/nodejs_postgres.sh",  privileged: false

  env = {}
  File.read(".env").split("\n").each do |ef|
    env[ef.split("=")[0]] = ef.split("=")[1]
  end 

  # if Vagrant.has_plugin?("vagrant-proxyconf")
   # config.proxy.http     = "http://#{env["INVENTORY_IP"]}:#{env['INVENTORY_PORT']}"
   # config.proxy.http     = "http://#{env["GATEWAY_IP"]}:#{env['GATEWAY_PORT']}"
   # config.proxy.http     = "http://#{env["BILLING_IP"]}:#{env['BILLING_PORT']}"
   # config.proxy.no_proxy = "localhost,127.0.0.1,.example.com"
 # end

  config.vm.define "inventory" do |inventory|    
    inventory.vm.provision "shell", path: "scripts/inventory.sh", :run => 'always',   privileged: false
    inventory.vm.network "private_network", ip: env['INVENTORY_IP']
    inventory.vm.network :forwarded_port, guest: 80, host: env['INVENTORY_PORT']    
  end
  
  config.vm.define "billing" do |billing|       
    billing.vm.provision "shell", path: "scripts/rabbitmq.sh"
    billing.vm.provision "shell", path: "scripts/billing.sh", :run => 'always',   privileged: false    
       
    billing.vm.network :forwarded_port, guest: 5672, host: env['BILLING_PORT']    
    billing.vm.network "private_network", ip: env['BILLING_IP']       
  end
  config.vm.define "gateway" do |gateway|  
    gateway.vm.provision "shell", path: "scripts/gateway.sh", :run => 'always',   privileged: false  
  
    gateway.vm.network "private_network", ip: env['GATEWAY_IP']
    gateway.vm.network :forwarded_port, guest: 82, host: env['GATEWAY_PORT']  
  end

end
