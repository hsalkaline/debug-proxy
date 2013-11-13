sudo networksetup -setwebproxy Ethernet 127.0.0.1 8080 off && node app.js $*;
sudo networksetup -setwebproxystate Ethernet off

