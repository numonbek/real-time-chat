import React from "react";
import axios from "axios";

function WebSocketComponent() {
    const [messages, setMessages] = React.useState([])
    const [value, setValue] = React.useState('')
    const [connected, setConnected] = React.useState(false)
    const [userName, setUserName] = React.useState('')
    const socket = React.useRef()
    console.log(socket)

    const connect = () => {
        socket.current = new WebSocket(`ws://localhost:5000`)

        socket.current.onopen = () => {
            console.log(`Socket onopen`)
            setConnected(true)
            const message = {
                event: 'connection',
                userName,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            console.log(`Socket onmessage`)
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log(`Socket onclose`)
        }
        socket.current.onerror = () => {
            console.log(`Socket error`)
        }
    }

    const sendMessages = async () => {
        const message={
            userName,
            message:value,
            id:Date.now(),
            event:'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
        // await axios.post('http://localhost:5000/new-messages', {
        //     message: value,
        //     id: Date.now()
        // })
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="">
                    <div className='form'>
                        <input type='text' placeholder='write your name...' value={userName}
                               onChange={e => setUserName(e.target.value)}/>
                        <button onClick={connect}>Войти</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div className="">
                <div className='form'>
                    <input value={value} onChange={e => setValue(e.target.value)} type='text'/>
                    <button onClick={sendMessages}>Отправить</button>
                </div>
                <div className='messages'>
                    {
                        messages.map(mess =>
                            <div key={mess.id}>{
                                     mess.event === 'connection' ? <div
                                        className='connection_message'>Пользователь {mess.userName} подключился</div> :
                                    <div className='message'>{mess.userName}. {mess.message}</div>
                            }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default WebSocketComponent;