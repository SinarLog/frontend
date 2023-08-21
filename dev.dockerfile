# build environment
FROM node:16-alpine 

WORKDIR /app

#Environment variables.
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

# Install from package-lock.json
RUN npm ci
# Install nodemon for hot-reload
RUN npm install nodemon --save-dev

ENV PORT 3000
ENV HOST 0.0.0.0

CMD ["nodemon", "--exec", "npm", "start"]
