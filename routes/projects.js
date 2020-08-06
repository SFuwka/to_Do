const express = require('express');
const router = express.Router()
const Project = require('../models/project');



router.get('/', async (req, res, next) => {
    try {
       const projects = await Project.find({}).sort({creationDate: -1})
       res.render('projects/index',{projects: projects})
    } catch {
        res.redirect('/')
    }
    //res.render('projects/index', { title: 'projects' })
})

router.get('/new', (req, res, next) => {
    res.render('./projects/new', { title: 'new project', project: new Project() })
})

router.post('/create', async (req, res, next) => {
    const project = new Project({
        name: req.body.projectName,
        userId: 'TEMP' // temprorary foreign key
    });
    console.log(project)
    try {
        const newProject = await project.save();
        res.redirect('/projects')
    } catch (error) {
        console.log(error)
        res.render('./projects/new', {
            project: project,
            errorMessage: 'Failed to create project'
        })
    }

})

module.exports = router;