'use client';

import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react';
import {cn} from '@/utils/utils';
import * as LabelPrimitive from '@radix-ui/react-label';

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => {
    return (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
