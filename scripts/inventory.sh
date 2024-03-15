#!/bin/bash
echo "*******************************"
echo "Starting INVENTORY             "
echo "*******************************"

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

set -a      # turn on automatic exporting
. .env  # source test.env
set +a      # turn off automatic exporting
nvm use node
npm install pm2@latest -g ; pm2 update

sudo -u postgres psql template1 -c "ALTER USER postgres WITH PASSWORD 'vagrant'"
sudo -u postgres createdb movies || echo "Database already exists"

cd /vagrant/srcs/inventory-app
npm install
pm2 start -f server.js -n inventory-app --watch