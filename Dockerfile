FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .


EXPOSE 5000

CMD ["npm", "run", "start"]


#use  docker build -t "lbfe-backend" .
#use docker run -d -p 5000:5000 --name "backend-container" lbfe-backend
