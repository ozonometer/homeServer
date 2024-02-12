For Raspberry 1B install node.js v8.9.0
install node.js
wget https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-armv6l.tar.gz
tar -xzf node-v8.9.0-linux-armv6l.tar.gz
cd node-v8.9.0-linux-armv6l/

install mariadb
apt install mariadb-server
sudo mysql_secure_installation

to enter mysql from pi console
mysql -p -u root

cd /etc/mysql/mariadb.conf.d/
nano 50-server.cnf
change bind-address to 0.0.0.0 to allow remote access
sudo service mysql restart

CREATE USER 'username'@'localhost' IDENTIFIED BY 'pass';
CREATE USER 'username'@'%' IDENTIFIED BY 'pass';

GRANT ALL ON *.* TO 'username'@'localhost';
GRANT ALL ON *.* TO 'username'@'%';
flush privileges;

CREATE DATABASE monitoring;

CREATE TABLE sumpump (
                         id MEDIUMINT NOT NULL AUTO_INCREMENT,
                         operation varchar(10),
                         batteryVoltage varchar(10),
                         timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         PRIMARY KEY (id)
);


to run the server application daemonized (in the background) install pm2

sudo npm install -g pm2

pm2 start app.js

command to generate a command that will launch PM2 on boot

pm2 startup systems

generated command, copy and run it

sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin

command to save the current state of PM2 (with app.js running) in a dump file

pm2 save

check anytime the status of your application with 

pm2 list, pm2 status or pm2 show.
