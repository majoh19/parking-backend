const app = require('./app')
const { getConnection } = require('./database/configuration')
const dotenv = require('dotenv').config()

const connection = getConnection()

app.set('port', process.env.PORT)

app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}`)
})