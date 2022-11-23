# QUICKSTART-FRONTEND

* npm install 
* npm run dev locally

# How to deploy to your niginx server 
1) SSH into your droplet that holds your Nginx and Tomcat + Mysql (the last two running in our docker-compose setup)
2) Type:  cd /var/www
*    In all the following, replace XXXX with the name of your frontend project, for example movie
3) In the www folder, create a new folder to hold the front-end project:  mkdir XXXX
4) Set permissions so we can upload the project:  chmod -R 747 XXXX
5) Go to package.json in your visual studie code or webstorm
*    "build": "vite build --base=/XXX/", <-- replace XXX with the name you created your folder with
6) npm build in terminal 

Angående deployment af frontend: Vi bruger "npm run build" til at bygge vores frontend. 
Derefter kan man finde den byggede udgave i folderen "dist".
Filerne heri og foldere kopieres derefter til dropletten i en folder under /var/www som er default location for Nginx med "scp".
F.eks. kunne folderen hedde "/var/www/CA1/". Problemet er nu, at at index.html importerer vores javascript fra en forkert folder.
Derfor skal vi angive rodfolderen for applikationen i package.json. Det gøres således: ""build": "vite build --base=/CA1". 


7)  Open a terminal (git bash or something) and navigate into the build folder created above, and type: scp -r ./dist/* root@XXXX:/var/www/XXX
