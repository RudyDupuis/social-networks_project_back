import Route from '@ioc:Adonis/Core/Route'

Route.post('user/create', 'UsersController.create').as('user.create')
Route.post('user/login', 'UsersController.login').as('user.login')
Route.post('user/logout', 'UsersController.logout').as('user.logout').middleware('auth')

Route.get('user/:id/profile', 'UsersController.showProfile').as('user.show.profile')
Route.get('user/myProfile', 'UsersController.showProfile').as('user.show.myProfile').middleware('auth')