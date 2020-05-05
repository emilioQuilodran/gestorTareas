'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
  Route.post('users/register', 'UserController.store');
  Route.post('users/login', 'UserController.login');
  // Rutas de los proyectos
  Route.get('projects', 'ProjectController.index').middleware('auth');
  Route.post('projects', 'ProjectController.create').middleware('auth');
  Route.delete('projects/:id', 'ProjectController.destroy').middleware('auth');
  Route.patch('projects/:id', 'ProjectController.update').middleware('auth')
  // Rutas de las tareas
  Route.get('projects/:id/tasks', 'TaskController.index').middleware('auth');
  Route.post('projects/:id/tasks', 'TaskController.create').middleware('auth');
  Route.patch('projects/:id', 'TaskController.update').middleware('auth');
  Route.delete('projects/:id', 'TaskController.destroy').middleware('auth');
}).prefix('huertoApi/v1');