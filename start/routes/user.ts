import Route from '@ioc:Adonis/Core/Route'

Route.post('user/create', 'UsersController.create')
Route.post('user/login', 'UsersController.login')