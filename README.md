# Install Concurently

npm i concurrently

## Edit your scripts i package.json like this

"scripts": {
"start": "nodemon index.js",
"client": "npm start --prefix ../client",
"dev": "concurrently \"npm start\" \"npm run client\""
},

### `npm start dev`
