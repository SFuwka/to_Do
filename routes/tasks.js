const express = require('express');
const router = express.Router({ mergeParams: true })
const Task = require('../models/Task');

router.get('/:id', (req, res, next) => {
    res.send(req.task)
})

router.post('/:id', (req, res, next) => {
    next()
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

router.put('/', (req, res, next) => {
    req.body.forEach(async function (task) {
        try {
            await Task.updateOne({ _id: task.taskId }, { $set: { completed: !task.completed } })
        } catch (error) {
            next(error)
        }
    });
    console.log(req.project.id)
    res.sendStatus(204)
})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;