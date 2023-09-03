import dynamic from 'next/dynamic';

const Presentation = dynamic(() => import('../../../components/presentation'), { ssr: false });

const SECRET: string = '1693769190153147526';
const SOCKET_ID: string = '92a17eeda40da7aa';

export default function Controller() {
    return (
        <Presentation role="controller" secret={SECRET} id={SOCKET_ID}>
            <section>
                <h2>test slide 1</h2>
            </section>
            <section>
                <h2>test slide 2</h2>
            </section>
        </Presentation>
    );
}
