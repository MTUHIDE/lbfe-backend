#you can change it from 22 to 18 if its not working properly 
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9010

EXPOSE 9010

CMD ["npm", "run", "server-dev"]


#use  docker build -t "lbfe-backend" .
#use docker run -p 9010:9010 --name "backend-container" lbfe-backend
