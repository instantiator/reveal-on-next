'use client'; // required for swr

import React, { useState } from 'react';
import { ReactNode, useEffect } from 'react';
import Question from './Question';
import useSWR from 'swr';
import parse, { HTMLReactParserOptions } from 'html-react-parser';

const fetcher = (url: string) => fetch(url).then((res) => res.text());

const options: HTMLReactParserOptions = {
    htmlparser2: {
        lowerCaseTags: false
    }
};

export default function PresentationContent({ src, onLoaded }: { src: string, onLoaded: () => any }) {
    const { data, error, isLoading } = useSWR(src, fetcher, { onSuccess: () => onLoaded() });

    if (isLoading) return (<div>Loading...</div>);
    if (error) return (<div><h2>Error</h2><p>{error}</p></div>);

    return (<div className="slides">{parse(data ?? '', options)}</div>);
};

// TODO: html-react-parser doesn't seem to do the job - it's rendering Question as question - ie. keeping it as html
// TODO: instead try: html-to-react, https://www.npmjs.com/package/html-to-react
