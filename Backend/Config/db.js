const mongoose  = require("mongoose");

const connectdb =  async()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://ravitomerak4747:ravitomer@cluster1.jntqh9o.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useFindAndModify:true,
        });
        console.log(`MongoDB Connected:${conn.connection.host}`)
    }catch(error){
         console.log(`error: ${error}`);
         process.exit();
    }
}
module.exports = connectdb;