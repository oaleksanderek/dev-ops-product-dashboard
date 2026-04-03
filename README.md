## Run guide
1. Pull following docker images
  - oaleksanderek/product-dashboard-frontend
  - oaleksanderek/product-dashboard-frontend
2. Run following commands
  - docker network create product-net
  - docker run -d --name backend --network product-net oaleksanderek/product-dashboard-backend:latest
  - docker run -d --name frontend --network product-net -p 8080:80 oaleksanderek/product-dashboard-frontend:latest
3. Go to localhost:8080
