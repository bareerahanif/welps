import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const API_KEY = process.env.ANTHROPIC_API_KEY

app.post('/complete', async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', 
        max_tokens: 100,
        temperature: 0.2,
        messages: [
          {
            role: 'user',
            content: `Complete this code:\n\n${prompt}`,
          },
        ],
      }),
    })

    const data = await response.json()
    console.log('[Claude response]', JSON.stringify(data, null, 2)) 

    const completion = data?.content?.[0]?.text || '// (no completion)'
    res.json({ completion })
  } catch (err) {
    console.error('[Claude API Error]', err)
    res.status(500).json({ completion: '// (error getting completion)' })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
