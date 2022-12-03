#!/usr/bin/env bash

# PROJECT_NAME="Name or your frontend project, for example movie --> folder you created under /var/www"
# DROPLET_URL="URL for your droplet"


echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

# first xxxxxx with your droplet url
# second xxxxx with your frontend folder
scp -r ./dist/* root@xxxxx:/var/www/xxxxx

# write ./deploy.sh in terminal everytime you want to deploy frontend changes on your nginx server 
