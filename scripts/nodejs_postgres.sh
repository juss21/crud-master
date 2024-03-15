#!/bin/bash
echo "*******************************"
echo "Installing Node JS and Postres "
echo "*******************************"

sudo chown -R vagrant:vagrant /home/vagrant

sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install node
sudo apt-get --assume-yes install postgresql
sudo systemctl start postgresql.service

npm install pm2@latest -g
npm install amqplib
exit 