'use client';
import Anthropic from '@anthropic-ai/sdk';
import React, { useEffect, useState } from 'react';
import '../Chatbar/Form.css';
import './ChatBox.css';

interface ChatBox3Props {
  userInput: string;
}


const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});


async function callAntrhopic(userInput: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: userInput },],
    });

    //bad fix but for now i will do this 
    const rawMessage = JSON.stringify(response.content[0])
    const cleanedMessage = rawMessage.slice(23,-2);
    //console.log(response.content[0])
    return cleanedMessage || "No response from Claude.";
   

    
  } catch (error) {
    console.error("Error calling GPT-4 API:", error);
    return "An error occurred while fetching the response.";
  }
}


const ChatBox3: React.FC<ChatBox3Props> = ({ userInput }) => {
  const [chatBoxContents, setChatBoxContents] = useState<string[]>([]);

  useEffect(() => {
    if (userInput.trim() !== '') {
      (async () => {
        const antResponse = await callAntrhopic(userInput);
        // Append the new response to the existing array of contents
        setChatBoxContents((prevContents) => [...prevContents,`User: ${userInput}`, `Claude: ${antResponse}` ]);
        console.log(`Antrhopic response was: ${antResponse}`);
      })();
    }
  }, [userInput]);

  return (
    <>
      <div id="ChatBox3" className='chatbox'>
        {chatBoxContents.length > 0 ? (
          chatBoxContents.map((content, index) => (
            <p key={index} style={{ marginBottom: '10px' }}>
              {content}
            </p>
          ))
        ) : (
          <p style={{ color: "#9ca3af", textAlign: "center" }}>
            Claude
          </p>
        )}
      </div>
    </>
  );
};

export default ChatBox3;
