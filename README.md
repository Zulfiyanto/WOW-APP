# Install Concurently

npm i concurrently
npm i nodemon

## Edit your scripts in package.json like this

"scripts": {
"start": "nodemon index.js",
"client": "npm start --prefix ../client",
"dev": "concurrently \"npm start\" \"npm run client\""
},

### `npm start dev`
