import React from 'react'
import ChatBot from './components/ChatBot'

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl border border-purple-200">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-purple-700">⚖️ K3's Legal Assistant</h1>
        <ChatBot />
      </div>
    </div>
  )
}

export default App
