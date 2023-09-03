'use client';

import React from 'react';
import { ReactNode, useEffect } from 'react';

import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

export default function Presentation({ children }: { children: ReactNode }) {
    useEffect(() => {
        const deck = new Reveal({ embedded: true, plugins: [ Markdown ]});
        deck.initialize();
    }, []);

    return (<>
        <p>Presentation...</p>
        <div className="reveal" style={{ width: '100%', flexGrow: 1, border: 'solid 1px black' }}>
            <div className="slides">
                { children }
            </div>
        </div>
    </>);
};
