import express from "express";
import mongoose from 'mongoose';
import { DATABASE_URL } from './env.js';
import Task from './models/Task.js';

mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'));

const app = express();

app.use(express.json());

function asyncHandler(handler) {
    return async function (req, res) {
        try  {
            await handler(req ,res);
        } catch (error) {
            if(error.name === 'ValidationError') {
                res.status(400).send({message : error.message});
            } else if(error.name === 'CastError'){
                res.status(404).send({message : 'Cannot find given id.'});
            } else {
                res.status(500).send({message : error.message});
            }
        }
    }
}

// GET /tasks - 여러 tasks 조회
app.get('/tasks', asyncHandler(async (req , res) => { 
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;
    const sortOption = {created : sort === 'oldest' ? 'asc' : 'desc'};
    const tasks = await Task.find().sort(sortOption).limit(count);
    res.send(tasks);
}));

// GET /tasks/:id - 특정 task 조회
app.get('/tasks/:id', asyncHandler(async (req , res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if(task){
        res.send(task);
    } else {
        res.status(404).send({message: 'Cannot find given id task'});
    }
}));

// POST /tasks - 새로운 task 생성
app.post('/tasks', asyncHandler(async (req , res) => {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
}));

// PATCH /tasks/:id - 특정 task 수정
app.patch('/tasks/:id', asyncHandler(async (req , res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if(task) {
        Object.keys(req.body).forEach((el) =>  {
            task[el] = req.body[el];
        });
        await task.save();
        res.send(task);
    } else {
        res.status(404).send({message : "Cannot find given id."});
    }
}));

// DELETE /tasks/:id - 특정 task 삭제
app.delete('/tasks/:id', asyncHandler(async (req , res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if(task){
        res.sendStatus(204);
    } else {
        res.status(404).send({message: "Cannot find given id."});
    }
}));

app.listen(3000, () => console.log('Server started on port 3000'));
