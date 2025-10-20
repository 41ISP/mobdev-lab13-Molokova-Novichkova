import { useState } from "react"
import { sendMessage } from "../api/api"
import Button from "./Button"
import TextArea from "./TextArea"

const MessageField = ({ handleFetch }) => {
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const message = { content: e.target.content.value }
            sendMessage(message)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="create-message-section">
            <div className="container">
                <div className="create-message-card">
                    <h2 className="create-message-title">Создать сообщение</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="create-message-form"

                    >
                        <TextArea value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Поделись мнением"
                            name="content"
                        />
                        <Button disabled={message.length}>Отправить</Button>
                    </form>
                </div>
            </div>
        </div>

        // .create-message-section>.container>.create-message-card>h2.create-message-title+form.create-message-form
    )
}

export default MessageField
