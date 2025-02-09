"use client";
import { useState } from 'react';
import UserForm from './components/Chatbar/Form';
import ChatBox1 from './components/Chatboxes/ChatBox1';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './globals.css';



export default function Page() {
  const [userInput, setUserInput] = useState('');

  const handleUserInputChange = (input: string) => {
    setUserInput(input);
  };

  return (
    <>
      <title>AI HUB</title>
      <Header/>
      <Sidebar/>
      {/* Pass onDisplayCall as a prop to UserForm */}
      <UserForm onDisplayCall={handleUserInputChange} />
      <ChatBox1 userInput={userInput}/>
      {/* <ChatBox2 userInput={userInput}/>
      <ChatBox3 userInput={userInput}/>
      <ChatBox4 userInput={userInput}/> */}

    </>
  );
}
