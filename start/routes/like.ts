import Route from '@ioc:Adonis/Core/Route'

Route.post('like/post/:post_id', 'LikesController.create').as('like.create').middleware('auth')