FROM node:22
 
WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the api package.json
COPY frontend/web/package.json ./frontend/web/package.json
 
RUN npm ci

# Copy app source
COPY . .

RUN npm run turbo --  build --filter @depositify/web

EXPOSE 3000
 
CMD [ "npm", "run", "turbo", "--", "start:prod", "--filter", "@depositify/web"]