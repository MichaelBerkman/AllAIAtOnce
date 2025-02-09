'use client';
import React, { useState } from 'react';
import './Form.css';

interface UserFormProps {
  onDisplayCall: (userInput: string) => void; // Callback function for parent components
}

const UserForm: React.FC<UserFormProps> = ({ onDisplayCall }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim() !== '') {
      onDisplayCall(userInput);
      setUserInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='chatbar'>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
