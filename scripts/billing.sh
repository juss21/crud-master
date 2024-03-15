#!/bin/bash

echo "*******************************"
echo "Starting BILLING               "
echo "*******************************"

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

nvm use node
npm install pm2@latest -g ; pm2 update
set -a      # turn on automatic exporting
. .env  # source test.env
set +a      # turn off automatic exporting

sudo -u postgres psql template1
sudo -u postgres createdb orders
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'vagrant'"

if sudo -u postgres psql orders -c "SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE tablename = 'orders');" | grep -q 'f'; then
    sudo -u postgres psql orders -c "CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        number_of_items INTEGER NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL
    );"
else
    echo "Table 'orders' already exists."
fi

sudo systemctl start rabbitmq-server
sudo systemctl status rabbitmq-server

sudo rabbitmqctl add_user juss password
sudo rabbitmqctl set_user_tags juss administrator
sudo rabbitmqctl set_permissions -p / juss ".*" ".*" ".*"

cd /vagrant/srcs/billing-app
npm install
pm2 start --watch -f server.js -n billing-app --watch

exit