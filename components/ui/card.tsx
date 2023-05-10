import {cn} from "@/utils/utils";
import {Skeleton} from "@/components/ui/skeleton";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
            {...props}
        />
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Header = function CardHeader({ className, ...props }: CardHeaderProps) {
    return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
    return <div className={cn('p-6 pt-0', className)} {...props} />;
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Footer = function CardFooter({ className, ...props }: CardFooterProps) {
    return <div className={cn(' flex items-center p-6 pt-0', className)} {...props} />;
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Card.Title = function CardTitle({ className, ...props }: CardTitleProps) {
    return <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />;
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

Card.Description = function CardDescription({ className, ...props }: CardDescriptionProps) {
    return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
};

Card.Skeleton = function CardSkeleton() {
    return (
        <Card>
            <Card.Header className='gap-2'>
                <Skeleton className='h-5 w-1/5' />
                <Skeleton className='h-4 w-4/5' />
            </Card.Header>
            <Card.Content className='h-10' />
            <Card.Footer>
                <Skeleton className='h-8 w-[120px] bg-slate-200' />
            </Card.Footer>
        </Card>
    );
};
