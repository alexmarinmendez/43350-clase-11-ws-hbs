import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewsRouter from './routers/views.router.js'

const app = express()
const httpServer = app.listen(8080, () => console.log('Srv Up!'))
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/', viewsRouter)

const messages = []

io.on('connection', socket => {
    socket.broadcast.emit('alerta')
    socket.emit('logs', messages)
    socket.on('message', data => {
        messages.push(data)
        io.emit('logs', messages)
    })
})

