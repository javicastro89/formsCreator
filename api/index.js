require("dotenv").config();
const server = require('./src/app')
const {conn} = require('./src/db')


conn.sync({ force: true})
.then(() =>{
    server.listen(process.env.PORT, () => console.log('Listening at ' + process.env.PORT))
})
