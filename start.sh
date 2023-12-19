#!/bin/bash

## START ALL
sudo systemctl start mongod
npm run start --prefix ./backend &
npm run start --prefix ./frontend &