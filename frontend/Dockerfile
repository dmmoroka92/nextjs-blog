FROM node:22

WORKDIR  /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev", "--", "-p", "3001", "-H", "0.0.0.0"]