docker run -v $(pwd):/app:ro -v /app/node_modules -p 4000:3000 -d --name expressnode nodedocker
docker exec -it expressnode bash     

$(pwd):/app
#hostmachine path:container path

4000:3000
#hostmachine:container


#bind mount
$(pwd):/app 

#bind oneway as read only container
$(pwd):/app:ro

#dont sync container
-v /app/node_modules

#list images:
docker image ls

#list of containers running:
docker ps


docker rm expressnode -f
docker rm expressnode -fv
docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 4000:3001 -d --name expressnode nodedocker


docker volume ls
docker volume prune

docker-compose up -d
docker-compose down -v
##-- rebuild 
docker-compose up -d --build

printenv
docker exec -it nodedocker-node-docker-1 bash  


 #combine docker compose
 #dev environment
 docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
 #prod env
 docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d