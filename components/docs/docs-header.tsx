import {ReactTagProps} from "@/@types";

import {cn} from "@/utils/utils";

interface DocsHeaderProps extends ReactTagProps<'div'> {
    heading: string;
    text?: string;
}

export const DocsHeader = ({ className, heading, text, ...props }: DocsHeaderProps) => {
    return (
        <>
            <div className={cn('space-y-4', className)} {...props}>
                <h1 className='inline-block font-heading text-4xl lg:text-5xl'>{heading}</h1>
                {text && <p className='text-xl text-muted-foreground'>{text}</p>}
            </div>
            <hr className='my-4' />
        </>
    );
};
