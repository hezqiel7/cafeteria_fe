FROM node:22.12.0

WORKDIR /app/cafeteria_fe

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]