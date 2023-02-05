const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev', {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology:true,
            
        });
        console.log('connect success!!');
    } catch (error) {
        console.log('connect failure!!');
    }
    
}
module.exports = { connect };