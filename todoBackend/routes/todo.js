const express = require("express");
const routers = express.Router();
const Todo = require("../models/todo");

// Create a new todo
routers.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send(todo);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all todos
routers.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    res.json(todo); 
  } catch (err) {
    res.status(400).send(err.message);
  }
});

routers.delete('/:id',async(req,res)=>{
  try{
    const todo=await Todo.findByIdAndDelete(req.params.id)
    if(!todo){
      return res.status(404).send("Task not found")
    }
    res.send(todo)
  }catch(err){
    res.status(400).send(err.message)
  }
})

routers.put('/:id',async(req,res)=>{
  try{
    const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!todo){
      return res.status(404).send("Task not found")
    }
    res.send(todo)
  }catch(err){
    res.status(400).send(err.message)
  }
})
module.exports = routers;
