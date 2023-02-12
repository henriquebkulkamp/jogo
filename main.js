import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import { VerificarVitoria } from './victoriConditions.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const port = 3000
const servers = {}

function createServer(socket) {
    const room = `room${socket.id}`
    socket.join(room)
    console.log(`room ${room} was created`);
    socket.emit('new-room', room)
    servers[room] = {
        houses: {
            a : { face: null, status: 'livre', player: undefined },
            b : { face: null, status: 'livre', player: undefined },
            c : { face: null, status: 'livre', player: undefined },
            d : { face: null, status: 'livre', player: undefined },
            e : { face: null, status: 'livre', player: undefined },
            f : { face: null, status: 'livre', player: undefined },
            g : { face: null, status: 'livre', player: undefined },
            h : { face: null, status: 'livre', player: undefined },
            i : { face: null, status: 'livre', player: undefined }},
            turn: NaN,
            winner: null,
            playersConnected: []
        }
        return room
}

app.use(express.static('public'));

sockets.on('connection', (socket) => {
    let room
    let draw
    const playerId = socket.id
    console.log(`> Player connected on server with id ${playerId}`)
    let joined = false
    if (Object.keys(servers) == 0) {
        room = createServer(socket)
        servers[room].playersConnected.push(playerId)
    } 
    else {
        for (let server of Object.keys(servers)) {
            if (servers[server].playersConnected.length == 1) {
                room = server
                socket.join(room)
                console.log(`> Player ${playerId} joined on room ${room}`)
                servers[room].playersConnected.push(playerId)
                servers[room].turn = 1
                joined = true
            }
        }
        if (!joined) {
            room = createServer(socket)
            socket.join(room)
            servers[room].playersConnected.push(playerId)
            joined = true
        }
    }


    socket.on('HouseSelected', (command) => {
        if (servers[room].winner !== null) { return }    // mexer depois
        if (servers[room].houses[command.letter].status == 'livre') {
            if (playerId == servers[room].playersConnected[0] && servers[room].turn%2 == 1) {
                servers[room].houses[command.letter] = { face:'x', status:'ocupado', player: 'player1', letter: command.letter }
                sockets.to(room).emit('jogada', servers[room].houses[command.letter])
                draw = true
                for (let house of Object.keys(servers[room].houses)) {
                    if (servers[room].houses[house].status == 'livre') {
                        draw = false
                        break
                    }
                }
                if (draw) {
                    sockets.to(room).emit('draw')
                }
                if (VerificarVitoria(servers[room].houses) == 'player1') {
                    console.log('> Player1 venceu')
                    servers[room].winner = 'player1'
                    sockets.to(room).emit('winner', servers[room].winner)
                }
                if (VerificarVitoria(servers[room].houses) == 'player2') {
                    console.log('> Player2 venceu!')
                    servers[room].winner = 'player2'
                    sockets.to(room).emit('winner', servers[room].winner)
                }
                servers[room].turn++
            }

            if (playerId == servers[room].playersConnected[1] && servers[room].turn%2==0) {
                servers[room].houses[command.letter] = { face: 'o', status:'ocupado', player: 'player2', letter: command.letter }
                sockets.to(room).emit('jogada', servers[room].houses[command.letter])
                if (VerificarVitoria(servers[room].houses) == 'player1'){
                    console.log('> Player1 venceu!')
                    servers[room].winner = 'player1'
                    sockets.to(room).emit('winner', servers[room].winner)
                }
                if (VerificarVitoria(servers[room].houses) == 'player2') {
                    console.log('> Player2 venceu!')
                    servers[room].winner = 'player2'
                    sockets.to(room).emit('winner', servers[room].winner)
                }
                servers[room].turn++
            }
        }
    })

    socket.on('disconnect', () => {
        console.log(`> Player disconnect: ${playerId}`)
        servers[room].playersConnected.splice( servers[room].playersConnected.indexOf(playerId), 1)
        servers[room].houses = {
            a : { face: null, status: 'livre', player: undefined },
            b : { face: null, status: 'livre', player: undefined },
            c : { face: null, status: 'livre', player: undefined },
            d : { face: null, status: 'livre', player: undefined },
            e : { face: null, status: 'livre', player: undefined },
            f : { face: null, status: 'livre', player: undefined },
            g : { face: null, status: 'livre', player: undefined },
            h : { face: null, status: 'livre', player: undefined },
            i : { face: null, status: 'livre', player: undefined }
        }
        servers[room].winner = null
        sockets.to(room).emit('clean')
        servers[room].turn= NaN
    })
})

server.listen(port, () => {
    console.log(`> App listening on port ${port}`)
})