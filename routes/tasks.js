const express = require('express');
const router = express.Router({ mergeParams: true })
const Task = require('../models/Task');

router.get('/', async (req, res, next) => {

})

router.post('/', async (req, res, next) => {
    const task = new Task({
        name: req.body.task,
        project: req.project.id
    })
    try {
        const newTask = await task.save();
        res.status(201).redirect(`/projects/${req.project.id}`)
        
    } catch {
        res.render('./projects/project', {
            project: req.project,
            task: task,
            errorMessage: 'Failed to create task'
        })
    } 
})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;