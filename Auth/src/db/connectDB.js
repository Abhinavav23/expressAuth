const mongoose = require('mongoose');

const username = encodeURIComponent('Newton');
const password = encodeURIComponent('Newton@2022');
const dbName = 'NewtonDB'
console.log(password);

const url = `mongodb+srv://${username}:${password}@cluster0.fenkfn7.mongodb.net/${dbName}?retryWrites=true&w=majority`

const optionalParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, optionalParams)
.then(() => {
    console.log(`database connection is successful`);
})
.catch((e) => {
    console.log(`Error: ${e.message}`);
})


// Newton
// Newton@2022