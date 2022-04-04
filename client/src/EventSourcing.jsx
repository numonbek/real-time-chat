import {useEffect, useState} from "react";
import axios from "axios";

function EventSourcing() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connnect`)
        eventSource.onmessage=function(event){
            console.log(event.data)
        }
    }

    const sendMessages = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
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
                            <div className='message' key={mess.id}>{mess.message}</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default EventSourcing;