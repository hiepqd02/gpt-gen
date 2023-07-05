const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Configuration, OpenAIApi } = require('openai')

const config = new Configuration({
  apiKey: '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', // Replace with your actual OpenAI API key
})

const openai = new OpenAIApi(config)

// // Setup server
const app = express()
app.use(cors({ origin: true }))
app.use(bodyParser.json())

app.post('/chat', async (req, res) => {
  const { words } = req.body
  console.log(words)
  const prompt = `Please give me a sentence with these words: ${words}`
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })
    console.log(completion)
    res.send(completion.data.choices[0].message.content)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
