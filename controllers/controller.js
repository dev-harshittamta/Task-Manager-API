const fs = require('fs')
const Validator = require("../validator/validator")

const getAllTasks = (req, res) => {
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(JSON.parse(data))
    }
  })
}


const getAllSortedTasks = (req,res) =>{
  fs.readFile('tasks.json', 'utf8', (err, rawData) => {
    if (err) {
      res.status(500).send(err)
    } else {
      let newData = JSON.parse(rawData);
      newData.sort((a, b) => new Date(a.created) - new Date(b.created));
      res.status(200).send(newData)
    }
  })
}

const getTask = (req,res) => {
  const {id:taskID} = req.params
  if(Validator.validateID(taskID)){
    res.status(500).send('Invalid Data entered, ID should always be number !!!');
  }
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      const newData = JSON.parse(data);
      const task = newData.find(task =>  task.id === Number(taskID))
      res.status(200).send(task)
    }
  })
}

const createTask = (req, res) => {
  const task = req.body;
  task.created = new Date().toISOString();
  if(Validator.validateData(task)){
    res.status(500).send('Incorrect data received !!!');
  }
  else{
    fs.readFile('tasks.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const newData = JSON.parse(data);
        newData.push(task);
  
        fs.writeFile('tasks.json', JSON.stringify(newData), (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(task);
          }
        });
      }
    });
  }

  
}

const deleteTask = (req, res)=>{
  const {id: taskID} = req.params;
  if(Validator.validateID(taskID)){
    res.status(500).send('Invalid Data entered, ID should always be number !!!');
  }
  else{
    fs.readFile('tasks.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex((task) => task.id === Number(taskID));
  
        if (taskIndex === -1) {
          res.status(404).send(`Task with id ${taskID} not found`);
        } else {
          tasks = tasks.filter((task) => task.id !== Number(taskID));
          console.log("Tasks:", tasks)
  
          fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send(`Task with id ${taskID} has been deleted`);
            }
          });
        }
      }
    });
  }
  
}

const updateTask = (req, res) =>{
  const {id: taskID} = req.params;
  const taskUpdates = req.body;
  taskUpdates.created =  new Date().toISOString(),

  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let tasks = JSON.parse(data);

      const taskIndex = tasks.findIndex((task) => task.id === Number(taskID));

      if (taskIndex === -1) {
        res.status(404).send(`Task with id ${taskID} not found`);
      } else {
        tasks[taskIndex] = { ...tasks[taskIndex], ...taskUpdates };

        fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(`Task with id ${taskID} has been updated`);
          }
        });
      }
    }
  });
}


module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  getAllSortedTasks
}
