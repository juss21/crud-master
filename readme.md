# Crud-master

 This is simple movie streaming platform, where one API (inventory) will have information on the movies available and another one (billing) will process the payments.The API gateway will communicate in HTTP with inventory and using RabbitMQ for billing.

## Technologies used:
- Vagrant
- Virtualbox
- Ubuntu server
- Nodejs / npm
- RabbitMQ
- PostgreSQL

## Usage
Install Virtualbox, Vagrant, and Postman.

Clone or download the project, and write `vagrant up`. It should set up 3 different virtual machines (Inventory, billing and gateway).

#### API Gateway IP address: 192.168.56.12:8083

## Audit
### [Questions](https://github.com/01-edu/public/tree/master/subjects/devops/crud-master/audit)  

### [Video](https://youtu.be/cGk-uWAe7fs)

- In the video, I skipped vm setup with vagrant, because it takes around 5-10 minutes to run that command.

#
If you have any questions about the task, feel free to ask me. 

### Author: [Juss](https://01.kood.tech/git/juss)