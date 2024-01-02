import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with your OWN AI",
        1000,
        "Built with OpenAI",
        1000,
        "Your own customized ChatGPT",
        1000,
        "Model GPT-3.5 Turbo",
        1000,
      ]}
      speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
