import dynamic from 'next/dynamic';

const Presentation = dynamic(() => import('../../components/presentation'), { ssr: false });

export default function Slides() {
    return (
        <Presentation>
            <section>
                <h2>test slide 1</h2>
            </section>
            <section>
                <h2>test slide 2</h2>
            </section>
        </Presentation>
    );
}
