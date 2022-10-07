const express = require('express')

const app = express();
const cookie = require('cookie-parser')
const userRoute = require('./src/routes/userRoutes');

require('./src/db/connectDB');
// app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended:false})); // for reading form body we have to use this
app.use('/user', userRoute);

// app.use(express.static('./src.views'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', (req, res) => {
    // res.send('home page');
    res.render('home/home.ejs');
})

app.all('*', (req, res) => {
    res.send('Page not found')
})
const PORT = 5050

app.listen(PORT, () => {
    console.log(`auth server is running at ${PORT}`);
})