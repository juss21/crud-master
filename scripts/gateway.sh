#!/bin/bash
echo "*******************************"
echo "Starting GATEWAY               "
echo "*******************************"

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

set -a      # turn on automatic exporting
. .env  # source test.env
set +a      # turn off automatic exporting
nvm use node 
npm install pm2@latest -g ; pm2 update

cd /vagrant/srcs/api-gateway
npm install
pm2 start --watch -f server.js -n api-gateway --watch
