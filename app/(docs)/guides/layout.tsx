import {ReactNode} from "react";

interface GuidesLayoutProps {
    children: ReactNode;
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
    return <div className='mx-auto max-w-5xl'>{children}</div>;
}
