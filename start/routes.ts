import './routes/user'
import './routes/like'
import './routes/post';
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

