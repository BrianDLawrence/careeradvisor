/**
 * Utilize openAI to review the user's resume and the job description they are interested in. Ask openAI for practical feedback.
 */

import OpenAI from "openai";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  if (!config.openAIKey)
    throw createError({
      statusCode: 400,
      statusMessage: "UNDEFINED RUNTIME CONFIGURATION - NO open AI KEY",
    });

  const query = getQuery(event);

  const question =
    "Here is my resume: " +
    query.resume +
    " THIS IS THE END OF THE RESUME \n\n Here is the job description that I am interested in: " +
    query.jobdescription +
    " END OF JOB DESCRIPTION \n\n As a master career consultant, please review and provide some practical feedback on what changes I could make to my resume to have a greater chance of getting an interview, please consider the job description and provide pragmatic suggestions. Return your recommendations as a JSON object with a `suggestions` array of strings.";

  console.log("To Chat GPT:" + question);

  const configuration = {
    apiKey: config.openAIKey,
  };

  const openai = new OpenAI(configuration);
  try {
    const response = await openai.responses.create({
      model: config.openAIModel,
      input: question,
      text: {
        format: {
          type: "json_schema",
          name: "resume_suggestions",
          schema: {
            type: "object",
            properties: {
              suggestions: {
                type: "array",
                items: { type: "string" },
                description: "Practical resume improvement suggestions",
              },
            },
            required: ["suggestions"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });

    return JSON.parse(response.output_text);
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
    });
  }
});
