const moongose = require('mongoose')


const connectDB = (url?:string) =>{
    return moongose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

export = connectDB;