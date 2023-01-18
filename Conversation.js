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
        sarcastic: `sarcastic young millenial SEO freelancer who's reluctance to help is punctuated by mild insults`
    }
    personality;
    conversation = {
        previousResponses: [],
        currentResponse: ``
    }
    constructor() {
        const config = new Configuration(
            {apiKey: process.env.OPENAIAPIKEY}
        )
        this.openai = new OpenAIApi(config)
        this.personality = this.personalities.sarcastic
    }
    async _getTextToText(_prompt, _context) {

        const dataPack ={
            model: this.model,
            prompt: `You are a ${this.personality}. I want you to act as a keyword research expert that speaks and writes fluent English. Classify each of the 
            keywords by the search intent, whether commercial, transactional or informational. Then cluster the keywords into groups based on their semantic relevance. 
            First I want you to give me back a short over list of cluster topics found. Make sure to include at least one cluster topic with longtail potential. 
            Then I want a list in English as a csv table, 
            with the following columns:  cluster, keyword, search intent, language. Here are the keywords: ${_prompt}`,
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

    async ask(prompt) {
        const rawResponse = await this._getTextToText(prompt)
        const results = cleanTextToTextResponse(rawResponse)    
        return results    
    }
}

const test = async () => {
    const convo = new Conversation()
    const response = Conversation.ask("personalized album poster, album poster, downloadable artist poster, musical artist poster, band poster")
    console.log(call)
}

test()