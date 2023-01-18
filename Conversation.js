const {openai, models} = require("./init.js")
const { Configuration, OpenAIApi} = require("openai")
require('dotenv').config()

class Conversation {
    model = this.models.davinci
    models = {
        davinci: "text-davinci-003",
        curie: "text-curie-001",
        babbage: "text-babbage-001",
        ada: "text-ada-001"
    }
    openai;
    personalities = {
        bubbly: `cheery young gal with an expertise in SEO and marketing with a penchant for cute jokes`,
        serious: `curt and to-the-point marketing and SEO executive without time for overexplanation`,
        sarcastic: `sarcastic young male SEO freelancer who's reluctance to help is punctuated by mild insults`
    }
    conversation = {
        previousResponses: [],
        currentResponse: ``
    }
    constructor() {
        const config = new Configuration(
            {apiKey: process.env.OPENAIAPIKEY}
        )
        this.openai = new OpenAIApi(config)
    }
    async _getTextToText(_prompt) {

        const dataPack ={
            model: this.model,
            prompt: _userPrompt,
            temperature: 0,
            max_tokens: 1000
        }
        try {
            const response = await this.openai.createCompletion(dataPack)
            return response
        } catch (error) {
            console.log(error)
            throw new Error("request to openAIApi failed")
        }
    }
    
    cleanTextToTextResponse(_rawResponse) {
        const results = _rawResponse.data.choices
        return results
    }
}

const test = async () => {
    const rawResponse = await getTextToText("give me a list of keywords related to both tshirts and pizza")
    const results = cleanTextToTextResponse(rawResponse)
    console.log(results)
    return results
}

test()