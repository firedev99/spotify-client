import { useEffect, useCallback } from "react"

export const useSticky = (ref, callback) => {
    const toggleStickiness = useCallback(({ top }) => {
        callback({ top })
    }, [callback])

    useEffect(() => {
        const handleScroll = _ => {
            toggleStickiness(ref.current.getBoundingClientRect())
        };
        window.addEventListener("scroll", handleScroll);
        return _ => window.removeEventListener("scroll", handleScroll);
    }, [ref, toggleStickiness])
}