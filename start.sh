#!/bin/bash

# Set environment variables
export DB_HOST=localhost
export DB_PORT=27017

# Start the database service (example using systemd)
sudo systemctl start mongodb

# Navigate to the application directory
cd /home/leonardo/projetos/desafio-backend

# Start the application server (example using npm)
npm start