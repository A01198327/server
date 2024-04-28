FROM node:18

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    curl \
    unzip

RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list \
&& apt update \
&& apt install -y ngrok

#insertar autenticación de ngrok aquí, cuando abra en el dashboard en el apartado de "agents" viene la dirección a utilizar
RUN /usr/local/bin/ngrok authtoken 2filOj0IOcMquisB4K3WfHYTYp3_2aMJ8mUybZsbV5gJ2pWvL 

RUN npm install

COPY . .

EXPOSE 5500

CMD ["bash", "-c", "node index.js & sleep 5 && ngrok http 5500 > /dev/stdout"]
