import React, { useState, useRef, useEffect } from 'react'

const ChatBot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey! Tell me what kind of agreement you want to create 📝' },
  ])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { from: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    try {
      const res = await fetch('http://localhost:8000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),

      })

      const data = await res.json()
      const botMsg = {
        from: 'bot',
        text: data.reply || 'Hmm, I couldn’t understand. Try again? 🤖',
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '🚨 Server error. Please try again later.' },
      ])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="flex flex-col h-[80vh] w-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 rounded-xl border border-gray-300 shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow 
                ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your request, e.g., rental agreement for 11 months in Bangalore..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 py-2 rounded-r-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBot
