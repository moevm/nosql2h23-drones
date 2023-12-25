FROM node:20

ARG PROJECT_DIR

WORKDIR "${PROJECT_DIR}/backend"
COPY . .

# INSTALL NPM
RUN npm install -y

CMD ["npm", "run", "start"]