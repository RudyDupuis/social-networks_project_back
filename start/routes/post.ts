import Route from '@ioc:Adonis/Core/Route'

Route.post('post/create', 'PostsController.create').as('post.create').middleware('auth')