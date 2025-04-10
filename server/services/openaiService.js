import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function getOpenAIResponse(userInput) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful legal assistant that helps create documentation like rental agreements, NDAs, etc.' },
      { role: 'user', content: userInput },
    ],
    temperature: 0.7,
  })
  return completion.choices[0].message.content
}
