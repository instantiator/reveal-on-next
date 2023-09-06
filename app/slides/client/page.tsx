import PresentationContent from '@/components/PresentationContent';
import Question from '@/components/Question';
import dynamic from 'next/dynamic';

const Presentation = dynamic(() => import('../../../components/Presentation'), { ssr: false });

const SOCKET_ID: string = '92a17eeda40da7aa';

export default function Client() {
    return (<Presentation 
        role="client" 
        id={SOCKET_ID} 
        secret={null} 
        src="/presentation-tsx.html" />
    );
}
