'use strict'
const Project = use('App/Models/Project');

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

    async destroy({auth, request , params}){
        
    }
}

module.exports = ProjectController
