FROM node:22
 
WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the api package.json
COPY backend/calculations-service/package.json ./backend/calculations-service/package.json
 
RUN npm ci


# Copy app source
COPY . .

RUN npm run turbo --  build --filter @depositify/calculations-service

EXPOSE 4001
 
CMD [ "npm", "run", "turbo", "--", "start:prod", "--filter", "@depositify/calculations-service" ]