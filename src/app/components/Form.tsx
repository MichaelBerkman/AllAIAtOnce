'use client'
import { useState } from 'react';
import './Form.css';

interface UserFormProps{
    onDisplayCall: (userInput: string) => void;
}


function UserForm({onDisplayCall}: UserFormProps){

    const[userInput, setUserInput] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userInput.trim() !== '') {
            onDisplayCall(userInput); // Pass the event to the parent function
            setUserInput(''); // Clear input field
        }
    };
    return(
        <>       
            <form onSubmit={handleSubmit}>
                <input type='text'
                style={{color: 'black'}}
                value = {userInput}
                onChange = {(e) => setUserInput(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default UserForm;