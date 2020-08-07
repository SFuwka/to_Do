const express = require('express');
const router = express.Router()
const Project = require('../models/project');



router.get('/', async (req, res, next) => {
    let searchOptions = {}
    if (req.query.projectName !=null && req.query.projectName !== ''){
        searchOptions.name = new RegExp(req.query.projectName, 'i')
        console.log(searchOptions)
    }
    try {
        const projects = await Project.find(searchOptions).sort({ creationDate: -1 })
        res.render('projects/index', {title:'TO-DO projects', projects: projects, searchOptions: req.query })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    //res.render('projects/index', { title: 'projects' })
})

router.get('/new', (req, res, next) => {
    res.render('./projects/new', { title: 'TO-DO new project', project: new Project() })
})

router.post('/create', async (req, res, next) => {
    const project = new Project({
        name: req.body.projectName,
        userId: 'TEMP', // temprorary foreign key
        creationDate: Date.now()
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

router.delete('/:id', (req, res, next) => {

})

module.exports = router;