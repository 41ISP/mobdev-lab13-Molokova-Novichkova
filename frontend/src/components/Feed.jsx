import { useEffect, useState } from "react"
import { useUserStore } from "../store/store"
import MessageField from "./MessageField"
import MessageCard from "./MessageCard"
import { fetchMessages } from "../api/api"

const Feed = () => {
    const [messages, setMessages] = useState(undefined)
    const { jwt } = useUserStore()

    const handleFetch = async () => {
        try {
            setMessages(await fetchMessages())
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        handleFetch()
        const intervalId = setInterval(() => {
            handleFetch()
        }, 5000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <>
            {jwt && <MessageField handleFetch={handleFetch} />}
            <div className="messages-section">
                <div className="container">
                    <h2 className="section-title">Последние сообщения</h2>
                    <div className="messages-grid">
                        {messages &&
                            messages.map((message) => (
                                <MessageCard key={message.id} {...message} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed

// 1. Нужно где-то хранить, стейт
// 2. Дописать метод для получения сообщения в api.jsx
// 3. На прогрузке Feed (через useEffect) необходимо делать запрос и забирать все сообщения
// 4. Необходимо отображать все сообщения
