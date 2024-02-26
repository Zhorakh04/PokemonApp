import { useCallback, useRef } from "react";

export const useDebounce = (cb: (...args: any[]) => void, ms: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => cb(...args), ms);
        },
        [timer, ms]
    );

    return debouncedCallback;
};
