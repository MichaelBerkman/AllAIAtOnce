'use client';
import { useState } from 'react';
import './Button.css'; //dont forget to import the CSS 

function SubmitButton(){ //components are capitalized 

   
    
    const [isSubmitted, setIsSubmitted] = useState(false); //set the initial state of isSubmitted
    const [buttonText, setButtonText] = useState(`Button`);

    function submitHandler(){ //allows us to change the state of IsSubmitted. Notice that func name is lower case since its not a component
        setIsSubmitted(true);
    };

    return( 
        
        <button onClick = {submitHandler}>
            {buttonText}
        </button> // this is the HTML/CSS of the component 

    );
};

export default SubmitButton;