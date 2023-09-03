'use client';

import React from 'react';
import { ReactNode, useEffect } from 'react';

import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

const SOCKET_IO_SERVER = 'https://reveal-multiplex.glitch.me/';

export default function Presentation({ role, secret, id, children }: { role: string, secret: string | null, id: string, children: ReactNode }) {
    useEffect(() => {
        const reveal = new Reveal({
            embedded: true, 
            plugins: [ Markdown ],
            multiplex: {
                secret: secret,
                id: id,
                url: SOCKET_IO_SERVER
            },
            dependencies: [
                { src: 'https://reveal-multiplex.glitch.me/socket.io/socket.io.js', async: true },
                { src: 'https://reveal-multiplex.glitch.me/master.js', async: true },
                { src: 'https://reveal-multiplex.glitch.me/client.js', async: true },
            ]
        });
        window.Reveal = reveal; // make our reveal object global, for the master/client scripts
        reveal.initialize();
    }, []);

    return (<>
        <p>{role} presentation...</p>
        <div className="reveal" style={{ width: '100%', flexGrow: 1, border: 'solid 1px black' }}>
            <div className="slides">
                { children }
            </div>
        </div>
    </>);
};
