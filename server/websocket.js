const ws = require('ws')
const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))

wss.on('connection', function connection(ws) {
    console.log('adas')
    // ws.send(`Ползователь успешно подключился.`)
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case `message`:
                broadcaseMessage(message)
                break;
            case `connection`:
                broadcaseMessage(message)
                break

        }
    })
})

function broadcaseMessage(message){
    wss.clients.forEach(client=>{
        client.send(JSON.stringify(message))
    })
}

// const message = {
//     event: `message/connection`,
//     id: `123`,
//     data: `05.04.2022`,
//     username: `Numonbek`,
//     message: `Set Linkes`
// }