#!/bin/bash

# # navigate to app folder
# cd app

# # initial startup by running react-script "start", name process "marketing"
# # --watch watches and restarts if files change
# npm start
# pm2 start
# pm2 startup
# pm2 save
# pm2 restart all
systemctl -l enable nginx
systemctl -l start nginx