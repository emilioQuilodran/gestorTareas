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

    async destroy({auth, response , params}){
        const user = await auth.getUser();
        // deconstruite man
        const {id} = params;
        const project = await Project.find(id);

        if( project.user_id !== user.id ){
            return response.status(403).json({
                msj: "NO puedes eliminar un proyecto del cual no eres dueño"
            })
        }
        await project.delete();
        return project;


    }
}

module.exports = ProjectController
