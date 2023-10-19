/**
 * Utilize openAI to review the user's resume and the job description they are interested in. Ask openAI for practical feedback. 
 */

import OpenAI from "openai";
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {

    if (!config.openAIKey)
        throw createError({
            statusCode: 400,
            statusMessage: "UNDEFINED RUNTIME CONFIGURATION - NO open AI KEY"
        })

    const query = getQuery(event);

    const question = "Here is my resume: " + query.resume + " Here is the job description that I am interested in: " + query.jobdescription + " As a master career consultant, please review and provide some practical feedback on what changes I could make to my resume to have a greater chance of getting an interview."

    console.log("To Chat GPT:" + question)

    const configuration = {
        apiKey: config.openAIKey
    };

    const openai = new OpenAI(configuration);
    try {

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: question }],
            model: "gpt-3.5-turbo",
        });

        console.log(chatCompletion.choices[0].toString)

        return chatCompletion.choices[0].message?.content

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        })
    }
});