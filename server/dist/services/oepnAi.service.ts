import OpenAI from 'openai';


export class openAIService {
    public static _instance: openAIService;
    private constructor(private openAI: OpenAI) { }
    public static get instance() {
        if (!this._instance) {
            this._instance = new openAIService(new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] }));

        }
        return this._instance;
    }

    public async verifyFeedback(feedback: string[], url: string) {
        const response = await this.openAI.chat.completions.create({
            messages: [
                {
                    role: 'user', content: `
Verify if the feedback "${feedback}" for the website "${url}" is valid by checking if it includes: (1) a true context or specific situation, (2) an objective description of the issue or praise, (3) the impact of the issue or praise, and (4) a constructive, actionable suggestion or positive reinforcement. Respond with true if all criteria are met, otherwise false. For comparison, use this valid feedback: "It would greatly improve the user experience if the website's loading speed could be optimized, perhaps by reducing the size of images or using a content delivery network (CDN) to handle high traffic," and this invalid feedback: "Marketermilk is terrible. Fix it." Feedback containing vague or inappropriate language should return false. Additionally, refer to the guidelines from the University of Waterloo's Centre for Teaching Excellence for effective feedback. send just true if all criteria met or false otherwise, nothing else!`
                }
            ],
            model: 'gpt-3.5-turbo'
        })
        return response.choices[0].message.content?.toLocaleLowerCase();
    }
}