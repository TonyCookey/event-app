/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'
import DashboardController from 'App/Controllers/Http/DashboardController'
import EventsController from 'App/Controllers/Http/EventsController'


Route.get('/', async ({ view }) => {
  return view.render('signin')
})
Route.get('signup', async ({ view }) => {
  return view.render('signup')
})

Route.post('signin', async (ctx) => {
  return new AuthController().signin(ctx)
}).as('auth.signin')

Route.get('signout', async (ctx) => {
  return new AuthController().signout(ctx)
}).as('auth.signout')

Route.post('signup', async (ctx) => {
  return new AuthController().signup(ctx)
}).as('auth.signup')

Route.get('dashboard', async (ctx) => {
  return new DashboardController().dashboard(ctx)
}).as('auth.dashboard').middleware('auth')

Route.get('create-event', async ( ctx ) => {
  return new EventsController().index(ctx)
}).middleware('auth')

Route.post('create-event', async ( ctx ) => {
  return new EventsController().create(ctx)
}).middleware('auth')

Route.get('events', async ( ctx ) => {
  return new EventsController().events(ctx)
}).middleware('auth')



// Route.post('signin', 'AuthController.signin')
// Route.post('signup', 'AuthController.signup')

