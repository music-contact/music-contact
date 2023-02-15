const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/music-contact'

mongoose
  .connect(MONGODB_URI)
  .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch((error) => console.error(`An error ocurred when trying to connect to the database ${MONGODB_URI}`, error))  

// Stackoverflow: https://stackoverflow.com/questions/34319661/how-to-handle-mongodb-close-in-mongoose
// Well here is an idea that I think might be helpful. Node.js receives unix signals. So for example Ctrl+C sends a unix signal (SIGINT) to the Node.js application you're running in that terminal to terminate.
// Say you wanted to close your DB connection before shutting the node.js app. That way you can prevent lose of or damaging data. Well, a good way to do so is override the termination signal.
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected")
    process.exit(0) 
  })
})