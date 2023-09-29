const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())


app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');

    const postId = req.params.id
   
    const {content} = req.body;

    const newComment = {
        id:commentId,content,status:'pending'
    }

    const event = {
        type:'CommentCreated',
        data : {...newComment,postId}
    }
    
    await axios.post('http://localhost:4005/events', event).catch((err) => {
    console.log(err.message);
    })

    res.status(201).send(newComment)

})

app.post('/events',(req,res)=>{
    console.log('Received',req.body.type)
    res.send({status:'ok'})
})

app.listen(4001,()=>{
    console.log('Listening on 4001');
})
