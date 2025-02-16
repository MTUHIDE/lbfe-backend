FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .


EXPOSE 3000

CMD ["npm", "run", "start"]


#use  docker build -t "lbfe-backend" .
#use docker run -d -p 3000:3000 --name "backend-container" lbfe-backend
