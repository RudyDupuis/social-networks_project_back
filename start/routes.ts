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
| import './routes/customer'
|
*/

import './routes/user'
import './routes/post'

import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})



// Debug / Test

Route.get('/authTest', async () => {
  return { hello: 'world' }
}).middleware(['auth', 'isAdmin'])

Route.post('/avatarTest', async ({ request }) => {
  const avatar = request.file('avatar')!
  const user = new User()

  user.username = 'Allan'
  user.email = 'allan@email.com'
  user.password = 'test'
  user.role = 'ADMIN'
  user.avatarUrl = Attachment.fromFile(avatar)

  user.save()
}).middleware(['auth'])

Route.post('/avatarUpdateTest', async ({ request }) => {
  const avatar = request.file('avatar')!
  const user = await User.findBy('username', 'Allan')

  if(!user) {
    return { status: 'failure' }
  }

  user.avatarUrl = Attachment.fromFile(avatar)
  user.save()

  return { status: 'success' }
}).middleware(['auth', 'isAdmin'])
