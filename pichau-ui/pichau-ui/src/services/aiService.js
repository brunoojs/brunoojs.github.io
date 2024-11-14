import { HfInference } from "@huggingface/inference";

const HF_TOKEN = "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";
const inference = new HfInference(HF_TOKEN);

const INITIAL_CONTEXT = `
Você é um assistente da Pichau, uma loja especializada em produtos de tecnologia.
Seu objetivo é ajudar os usuários com dúvidas sobre produtos e serviços.
Mantenha as respostas concisas e profissionais.
`;

export async function getAIResponse(message, messageHistory) {
  try {
    const recentMessages = messageHistory.slice(-3).map((msg) => ({
      role: msg.isAI ? "system" : "user",
      content: [
        {
          type: "text",
          text: msg.text,
        },
      ],
    }));

    const messages = [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: INITIAL_CONTEXT,
          },
        ],
      },
      ...recentMessages,
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message,
          },
        ],
      },
    ];

    const formattedMessages = messages.map((msg) => `${msg.role}: ${msg.content[0].text}`).join("\n");

    const response = await inference.textGeneration({
      model: "meta-llama/Llama-3.2-1B", 
      messages: messages,
      inputs: INITIAL_CONTEXT,
    });

    console.log(response);

    return response.generated_text.trim();
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "Desculpe, estou tendo problemas para processar sua solicitação no momento.";
  }
}