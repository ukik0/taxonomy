import {useRouter} from "next/navigation";
import {SlugItem as Slug} from "@/@types";

import {cn} from "@/utils/utils";
import {Button, buttonVariants} from "@/components/ui/button";

interface SlugItemProps {
    slug: Slug;
    level?: number;
}

export const SlugItem = ({ slug, level = 1 }: SlugItemProps) => {
    const url = slug.url;
    const router = useRouter();

    if (!slug) return null;

    const handleButtonClick = async (slug: string) => {
        await router.push(`${url}${slug}`);

        router.refresh();
    };

    return (
        <ul className={cn('m-0 w-full px-2', { 'pl-4': level !== 1 })}>
            {slug.items.map((slug) => {
                return (
                    <li
                        key={slug.title}
                        className={cn('... mt-0 w-full overflow-hidden text-ellipsis pt-2', {
                            'cursor-not-allowed opacity-50': level !== 1
                        })}
                    >
                        <Button
                            onClick={() => handleButtonClick(slug.url)}
                            className={buttonVariants({
                                size: 'sm',
                                variant: 'link',
                                className:
                                    'text-[15px] font-bold bg-transparent text-foreground transition-colors hover:text-slate-900'
                            })}
                            disabled={level !== 1}
                        >
                            {slug.title}
                        </Button>

                        {slug.items && <SlugItem slug={slug} level={level + 1} />}
                    </li>
                );
            })}
        </ul>
    );
};
