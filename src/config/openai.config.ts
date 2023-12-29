// config open ai api key

import OpenAI from "openai";
const configureOpenAI = () => {
  const config = new OpenAI({
  apiKey: String(process.env.OPENAI_API_KEY),
  organization: process.env.OPEN_AI_ORGANIZATION_ID,
});
  return config;
};
export default configureOpenAI;
