# Use a imagem oficial do Node.js como base
FROM node:14

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta 3000 para acessar o servidor de desenvolvimento do React
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do React
CMD ["npm", "start"]
