# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_shop2_session',
  :secret      => 'b183b63db70e558e0d8903afbdccaf8741f3674d31e830fa523faa0974370b0fec6f4e8906e59e85b5347c9b6e1a11f3a14fcec31b2317fad1e74f74ea15fa7c'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
