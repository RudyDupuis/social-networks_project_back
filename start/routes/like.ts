import Route from '@ioc:Adonis/Core/Route'

Route.post('like/post/:post_id', 'LikesController.create').as('like.post.create').middleware('auth')
Route.post('like/comment/:comment_id', 'LikesController.create').as('like.comment.create').middleware('auth')

Route.post('unlike/post/:post_id', 'LikesController.delete').as('like.post.delete').middleware('auth')
Route.post('unlike/comment/:comment_id', 'LikesController.delete').as('like.comment.delete').middleware('auth')

Route.get('like/post/:post_id', 'LikesController.getByPostOrCommentId').as('like.post.get')
Route.get('like/comment/:comment_id', 'LikesController.getByPostOrCommentId').as('like.comment.get')
