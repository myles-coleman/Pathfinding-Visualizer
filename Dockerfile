FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public ./public
COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]