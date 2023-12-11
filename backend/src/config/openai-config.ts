export const configureOpenAI = () => {
  const config = {
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPEN_AI_ORGANIZATION_ID,
  };

  return config;
};
