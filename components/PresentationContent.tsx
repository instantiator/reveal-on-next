'use client'; // required for swr

import React, { useState } from 'react';
import { ReactNode, useEffect } from 'react';
import Question from './Question';
import useSWR from 'swr';
import parse, { HTMLReactParserOptions, Element } from 'html-react-parser';

const fetcher = (url: string) => fetch(url).then((res) => res.text());

const options = {
    replace: (domNode: any) => {
        if (domNode instanceof Element && domNode.attribs) {
            switch (domNode.tagName) {
            case 'question':
                console.log('Enriching question tag...');
                let question = domNode.attribs['question'];
                let explanation = domNode.attribs['explanation'];
                let instruction = domNode.attribs['instruction'];
                if (question && explanation && instruction) {
                    return (<Question question={question} explanation={explanation} instruction={instruction} />);
                }
                break;
            }
        }
    }
};

export default function PresentationContent({ src, onLoaded }: { src: string, onLoaded: () => any }) {
    const { data, error, isLoading } = useSWR(src, fetcher, { onSuccess: () => onLoaded() });

    if (isLoading) return (<div className="slides"><h2>Loading...</h2></div>);
    if (error) return (<div className="slides"><h2>Error</h2><p>{error}</p></div>);

    return (<div className="slides">{data && parse(data, options)}</div>);
};
