import dynamic from 'next/dynamic';

const Presentation = dynamic(() => import('../../../components/presentation'), { ssr: false });

const SOCKET_ID: string = '92a17eeda40da7aa';

export default function Client() {
    return (
        <Presentation role="client" id={SOCKET_ID} secret={null}>
            <section>
                <h2>test slide 1</h2>
            </section>
            <section>
                <h2>test slide 2</h2>
            </section>
        </Presentation>
    );
}
