import { Configuration, OpenAIApi } from "openai"
import "dotenv/config"

class Conversation {

    models = {
        davinci: "text-davinci-003",
        curie: "text-curie-001",
        babbage: "text-babbage-001",
        ada: "text-ada-001"
    }
    model = this.models.davinci
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
            prompt: `You are a ${this.personality}. I want you to act as a keyword research assistant that speaks and writes fluent English. Based on the given keyword prompt, please 
            generate a list of 3 highly related keyword phrases. Please rank them by their ability 
            to generate a high click through rate.
            For each keyword, please also generate a blog post headline or title including the given keyword or phrase. Please also list 5 related keywords to use in the article. Here are the keywords: ${_prompt}
            here is the format of your response. Don't take the content literally:
            
            prompt: initial_keyword
            response: keyword. blogpost. Related keywords: `,
            temperature: 0.9,
            max_tokens: 2048
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
        return results[0]
    }

    async ask(prompt) {
        const rawResponse = await this._getTextToText(prompt)
        const results = this.cleanTextToTextResponse(rawResponse)    
        return results    
    }
}

const test = async () => {
    const convo = new Conversation()
    const response = await convo.ask("panda tshirt")
    console.log(response.text.length)
    console.log(typeof response.text)
    console.log(`${response.text}`)
}

test()