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
sudo -u postgres createdb movies 

if sudo -u postgres psql movies -c "SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE tablename = 'movies');" | grep -q 'f'; then
    sudo -u postgres psql movies -c "CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR (50) NOT NULL,
        description TEXT
    );"
else
    echo "Table 'movies' already exists."
fi

cd /vagrant/srcs/inventory-app
npm install
pm2 start -f server.js -n inventory-app --watch

exit