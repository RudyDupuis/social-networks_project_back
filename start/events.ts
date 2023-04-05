import Event from '@ioc:Adonis/Core/Event'
import Like from 'App/Models/Like'

Event.on('new:like', (like: Like) => {
    
})