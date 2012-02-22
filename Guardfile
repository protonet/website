# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'passenger', :cli => '--daemonize --environment production' do
  watch(/^lib\/.*\.rb$/)
  watch(/^config\/.*\.rb$/)
  watch(/^app\/views\/.*\.erb$/)
end

