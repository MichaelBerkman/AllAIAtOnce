'use client';
import { OpenAI } from "openai";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import '../Chatbar/Form.css';
import './ChatBox.css';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function callGPT4(userInput: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Be a helpful assistant." },
        { role: "user", content: userInput },
      ],
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "No response from GPT-4.";
  } catch (error) {
    console.error("Error calling GPT-4 API:", error);
    return "An error occurred while fetching the response.";
  }
}

interface ChatBox1Props {
  userInput: string;
}

const ChatBox1: React.FC<ChatBox1Props> = ({ userInput }) => {
  const [chatBoxContents, setChatBoxContents] = useState<string[]>([]);

  useEffect(() => {
    if (userInput.trim() !== '') {
      (async () => {
        const gptResponse = await callGPT4(userInput);
        
        // Combine user and GPT response into one string
        const combinedMessage = `**User:** ${userInput}\n\n**ChatGPT:** ${gptResponse}`;
        
        setChatBoxContents((prev) => [...prev, combinedMessage]);
      })();
    }
  }, [userInput]);

  return (
    <div id="ChatBox1" className="chatbox">
      {chatBoxContents.length > 0 ? (
        chatBoxContents.map((content, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkBreaks]} 
            >
              {content}
            </ReactMarkdown>
          </div>
        ))
      ) : (
        <p style={{ color: "#9ca3af", textAlign: "center" }}>
          ChatGPT
        </p>
      )}
    </div>
  );
};

export default ChatBox1;