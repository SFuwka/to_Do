const express = require('express');
const router = express.Router()
const Project = require('../models/project');
const Task = require('../models/Task')



router.param('id', async (req, res, next, value) => {
    if (value === 'new') {
        next()
    }
    try {
        const project = await Project.findById(value)
        req.project = project
        next();
    } catch (error) {
        res.status(404).redirect('/404')
    }
})


const tasksRouter = require('./tasks');
router.use('/:id/tasks', tasksRouter);

router.get('/new', (req, res, next) => {
    res.render('projects/new', { title: 'TO-DO new project', project: new Project() })
})

router.get('/:id', async (req, res, next) => {
    let searchOptions = { project: req.project.id }
    let tasksCount = {}
    try {
        const tasks = await Task.find(searchOptions)
        let completedTasks = tasks.filter((task) => {
            return task.completed
        })
        tasksCount.completed = completedTasks.length
        tasksCount.all = tasks.length
        res.render('projects/project', { title: req.project.name, project: req.project, tasks: tasks, tasksCount: tasksCount })
    } catch (error) {
        console.log(error)
        res.redirect('/projects')
    }
})

router.get('/', async (req, res, next) => {
    let searchOptions = {}
    if (req.query.projectName != null && req.query.projectName !== '') {
        searchOptions.name = new RegExp(req.query.projectName, 'i')
    }
    try {
        const projects = await Project.find(searchOptions).sort({ lastModified: -1 })
        res.render('projects/index', { title: 'TO-DO projects', projects: projects, searchOptions: req.query })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


router.post('/create', async (req, res, next) => {
    const project = new Project({
        name: req.body.projectName,
        userId: 'TEMP', // temprorary foreign key
        lastModified: Date.now()
    });
    try {
        const newProject = await project.save();
        res.status(201).redirect('/projects')
    } catch (error) {
        console.log(error)
        res.render('./projects/new', {
            project: project,
            errorMessage: 'Failed to create project'
        })
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        await Project.updateOne({ _id: req.project.id }, { $set: { name: req.body.projectName }, $currentDate: { lastModified: true } })
        res.status(201).redirect('/projects')
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Project.deleteOne({ _id: req.project.id })
        await Task.deleteMany({ project: req.project.id })
        res.status(204).redirect('/projects')
    } catch (error) {
        next(error)
    }
})

module.exports = router;