FROM node:20

RUN apt-get update && \
    apt-get install -y python3 gcc g++ openjdk-17-jdk && \
    apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm" , "start"]