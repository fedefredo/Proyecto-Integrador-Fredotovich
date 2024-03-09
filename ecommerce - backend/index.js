const server = require('./app')
const mongoose = require('mongoose')


async function main() {
    try {
        await mongoose.connect("mongodb+srv://federicofredotovich:Alfabeta@eit-64910.ttghkam.mongodb.net/ecommerce")
        console.log('CONEXION A LA DB CORRECTA' )

        server.listen(3000, () => {
            console.log('Server is running at port 3000')
        })
    } catch (error) {
        console.log(error)
    }
}

main()



