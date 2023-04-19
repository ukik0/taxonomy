import {useEffect, useState} from 'react';

export const useMounted = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') setMounted(true), [];
    });

    return mounted;
};
