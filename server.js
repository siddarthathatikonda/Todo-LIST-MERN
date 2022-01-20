const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://tsiddartha:tsiddartha@cluster0.ygfjm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=>console.log("DB Connected...")
)
app.use(express.json());

app.use(cors({
    origin : '*'
}))

app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo : todo
        });
        newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})
app.get('/gettask',async (req,res)=>{
    try{
         return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }
})
app.delete('/delete/:id',async (req,res)=>{

    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())

    }
    catch(err){
        console.log(err)
    }
})


app.listen(5000,()=>{
    console.log("Server Running...")
}); 