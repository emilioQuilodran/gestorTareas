'use strict'
const Project = use('App/Models/Proyecto');

class ProyectController {
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
}

module.exports = ProyectController
