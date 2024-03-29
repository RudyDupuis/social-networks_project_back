import Route from '@ioc:Adonis/Core/Route'

Route.post('user/create', 'UsersController.create').as('user.create')
Route.post('user/update', 'UsersController.update').as('user.update').middleware('auth')
Route.post('user/login', 'UsersController.login').as('user.login')
Route.post('user/logout', 'UsersController.logout').as('user.logout').middleware('auth')

Route.get('user/:id', 'UsersController.getUser').as('user.show').middleware('silentAuth')
Route.get('user/:id/profile', 'UsersController.showFullProfile').as('user.show.profile')

Route.post('user/:id/subscribe', 'UsersController.subscribe').as('user.subscribe').middleware('auth')
Route.post('user/:id/unsubscribe', 'UsersController.unsubscribe').as('user.unsubscribe').middleware('auth')