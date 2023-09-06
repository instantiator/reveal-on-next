import React, { useState } from 'react';
import { ReactNode, useEffect } from 'react';
import Rating from 'react-rating';

export default function Question({ question, explanation, instruction }: { question: string, explanation: string, instruction: string }) {
    const [rating, setRating] = useState(0);

    const onRatingChange = (value: number) => {
        console.log(value);
        setRating(value);
    };

    return (<>
        <h2>{question}</h2>
        <p>{explanation}</p>
        <p>{instruction}</p>
        <Rating stop={5} initialRating={rating} onChange={onRatingChange} />
    </>);
};
