import express from "express";
import mongoose from 'mongoose';
import { DATABASE_URL } from './env.js';
import Task from './models/Task.js';
import mockTasks from "./data/mock.js";

mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'));

const app = express();

app.use(express.json());

app.get('/tasks' , async (req , res) => {
    
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;
    const sortOption = {created : sort === 'oldest' ? 'asc' : 'desc'};
    const tasks = await Task.find().sort(sortOption).limit(count);
    res.send(tasks);
})

app.get('/tasks/:id', async (req , res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    console.log(task);
    if(task){
        res.send(task);
    }else{
        res.status(404).send({message:'cannot found given id task'});
    }
} )

app.post('/tasks' , async ( req ,res) => {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
    
})



app.listen(3000, () => console.log('server stated'))