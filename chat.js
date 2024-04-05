// Get references to the input field and send button
const userInputField = document.getElementById("userInputField");
const sendButton = document.getElementById("sendButton");

// Add event listener to send button
sendButton.addEventListener("click", async () => {
    // Get user input from input field
    const userInput = userInputField.value;

    // Send user input to chat
    const result = await chat.sendMessage(userInput);

    // Handle result as needed
    console.log(result); // Just an example, you can do something meaningful here
});

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDwZFfwOW0eW0MZ4LvhCtspGcq4Ydq23_8E"; // Replace with your API key

async function runChat() {
    const genAI = new GoogleGenerativeAI(AIzaSyDwZFfwOW0eW0MZ4LvhCtspGcq4Ydq23_8);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ text: "hi"}],
            },
            {
                role: "model",
                parts: [{ text: "Hello there! How can I assist you today?"}],
            },
        ],
    });

    const result = await chat.sendMessage("YOUR_USER_INPUT");
    const response = result.response;
    console.log(response.text());
}

runChat();
