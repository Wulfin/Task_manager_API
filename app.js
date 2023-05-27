const express = require('express')
const mongoose = require('mongoose')
//const session = require('express-session');
//const MongoStore = require('connect-mongo');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Saif Elislam')
})

// MongoDB connection
const port = 3000;
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log("task manager API is running on port 3000")
    })
}).catch((error)=>{
    console.log(error);
})

const mydb = mongoose.connection;
mydb.on('error', console.error.bind(console, 'MongoDB connection error:'));
mydb.once('open', () => {
  console.log('Connected to MongoDB');
});


// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
app.use(authRoutes);
app.use(taskRoutes);


module.exports = app;