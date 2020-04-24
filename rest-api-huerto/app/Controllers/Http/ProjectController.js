'use strict'
const Project = use('App/Models/Project');
const AuthService = use('App/Services/AuthService');
class ProjectController {
    // return all objects
    async index({auth}){
        const user = await auth.getUser();
        return await user.proyects().fetch();
    }

    async create({auth, request}){
        const user = await auth.getUser();
        const {name} = request.all();
        const project = new Project();

        project.fill({
            name
        })

        await user.proyects().save(project);
        return project;
    };

    async destroy({auth, params}){
        const user = await auth.getUser();
        // deconstruite man
        const id = params.id;
        const project = await Project.find(id);

        // consume service
        AuthService.verifyAuth(project, user);
        await project.delete();
        return project;
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id} = params;
        const project = await Project.find(id);
        AuthService.verifyAuth(project, user);
        project.merge(request.only('name'));
        await project.save();
        return project;
    }
}

module.exports = ProjectController
