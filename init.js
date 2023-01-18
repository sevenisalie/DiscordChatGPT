const { Configuration, OpenAIApi} = require("openai")
require('dotenv').config()

const config = new Configuration(
    {apiKey: process.env.OPENAIAPIKEY}
)

const openai = new OpenAIApi(config)

const models = {
    davinci: "text-davinci-003",
    curie: "text-curie-001",
    babbage: "text-babbage-001",
    ada: "text-ada-001"
}

module.exports = {
    openai,
    models
}