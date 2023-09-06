import React from 'react';
import { ReactNode, useEffect } from 'react';

export default function Question({ question, explanation, instruction }: { question: string, explanation: string, instruction: string }) {

    return (<>
        <div>
            <h2>{question}</h2>
            <p>{explanation}</p>
            <p>{instruction}</p>
        </div>
    </>);
};
