'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthService = use('App/Services/AuthService');

class TaskController {

    async index({auth, request, params}){
        const user = await auth.getUser();
        const {id} = params;
        const project = await Project.find(id);
        AuthService.verifyAuth(project, user);

        return await project.tasks().fetch();

    }

    async create({auth, request, params}){
        const user = await auth.getUser();
        const {description} = request.all();
        const {id} = params;
        const project = await Project.find(id);

        AuthService.verifyAuth(project, user);
        const task = new Task();

        task.fill({
            description
        })

        await project.tasks().save(task);
        return task;
    }

    async update({auth,request ,params}){
        const user = await auth.getUser();
        const {id} = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthService.verifyAuth(project, user);
        tarea.merge(request.only([
            'description',
            'isComplete'
        ]))
        await tarea.save();
        return task;
    }

    async destroy({auth, params}){
        const user = await auth.getUser();
        const id = params.id;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        // consume service
        AuthService.verifyAuth(project, user);
        await task.delete();
        return task;
    }
}

module.exports = TaskController
