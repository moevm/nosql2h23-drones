FROM node:20

ARG PROJECT_DIR
ARG BACKEND_URL

WORKDIR "${PROJECT_DIR}/frontend"
COPY . .

RUN echo "export const BACKEND_URL = '${BACKEND_URL}'" >> dynamic_settings.js

# INSTALL NPM
RUN npm install -y

CMD ["npm", "run", "start"]