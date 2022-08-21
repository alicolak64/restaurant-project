const PORT = 8000;
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const fetch = require('node-fetch');
require('dotenv').config();


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// get all restaurant data 

app.get('/restaurants' , (req,res) => {
    
    const url = process.env.ENDPOINT;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': process.env.X_Cassandra_Token

        }
    }
    fetch(url , options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
} 
)


function notFound (req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler (err, req, res) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}


app.use(notFound);
app.use(errorHandler);
    

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}
)


