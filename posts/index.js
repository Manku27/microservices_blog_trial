const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.post('/posts/create',async (req,res)=>{
    const id = randomBytes(4).toString('hex');
   
    const {title} = req.body;

    const newPost = {
        id,title
    }

    const event = {
        type:'PostCreated',
        data : newPost
    }

    await axios.post('http://event-bus-srv:4005/events', event).catch((err) => {
    console.log(err.message);
  })

    res.status(201).send(newPost)

})

app.post('/events',(req,res)=>{
 
    res.send({status:'ok'})
})

app.listen(4000,()=>{
    console.log('Listening on 4000');
})
