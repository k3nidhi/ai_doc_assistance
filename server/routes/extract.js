import express from 'express'
import { OpenAI } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

router.post('/', async (req, res) => {
  const { input } = req.body
  console.log('📥 Received input:', input)
  if (!input) {
    return res.status(400).json({ reply: '❌ No input received.' })
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful legal assistant that drafts legal agreements.',
        },
        {
          role: 'user',
          content: input,
        },
      ],
    })

    const reply = completion.choices[0].message.content
    console.log('📤 AI reply:', reply)
    res.json({ reply })
  } catch (err) {
    console.error('❌ OpenAI error:', err)
    res.status(500).json({ reply: '⚠️ Error generating response from AI.' })
  }
})

export default router
