'use client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useEffect, useState } from 'react';
import '../Chatbar/Form.css';
import './ChatBox.css';

interface ChatBox4Props {
  userInput: string;
}

const ChatBox4: React.FC<ChatBox4Props> = ({ userInput }) => {
  const [chatBoxContents, setChatBoxContents] = useState<string[]>([]);

  useEffect(() => {
    async function handleDisplay(input: string) {
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.error('Missing environment variable: NEXT_PUBLIC_GEMINI_API_KEY');
        return;
      }

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

      try {

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(input);

        let responseValue = result?.response?.text;

        let responseText: string;
        if (typeof responseValue === 'string') {
          responseText = responseValue;
        } else if (typeof responseValue === 'function') {
          responseText = responseValue(); 
        } else {
          responseText = String(responseValue || 'No response received.');
        }

        // Append the new text to our chatBoxContents array
        setChatBoxContents((prevContents) => [... prevContents, `User: ${userInput}`, `Gemini: ${responseText}`]);

      } catch (error) {
        console.error('Error generating content:', error);
      }
    }

    // Only call Gemini if there's a non-empty input
    if (userInput.trim().length > 0) {
      handleDisplay(userInput);
    }
  }, [userInput]);

  return (
    <div id="ChatBox4" className='chatbox'>
      {chatBoxContents.length > 0 ? (
        chatBoxContents.map((content, index) => (
          <p key={index} style={{ marginBottom: '10px' }}>
            {content}
          </p>
        ))
      ) : (
        <p style={{ color: '#9ca3af', textAlign: 'center' }}>
          Gemini
        </p>
      )}
    </div>
  );
};

export default ChatBox4;
