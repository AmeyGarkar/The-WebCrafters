const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
async function connectToMongoDB(url){
    return mongoose.connect(url);
}
module.export = {
    connnectToMongoDB,
}