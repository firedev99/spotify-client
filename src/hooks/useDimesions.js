import { useEffect, useRef, useState } from "react";

// spare time time after resizing to re-initiate
function debounce(fn, ms) {
    let timer;
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    }
};

export const useDimesions = () => {
    const ref = useRef(null);
    const [dimensions, setDimensions] = useState({});
    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.getBoundingClientRect().width,
                height: ref.current.getBoundingClientRect().height
            })
        }

        const debouncedHandleResize = debounce(function handleResize() {
            if (ref.current) {
                setDimensions({
                    width: ref.current.getBoundingClientRect().width,
                    height: ref.current.getBoundingClientRect().height
                })
            }
        }, 100)

        window.addEventListener('resize', debouncedHandleResize);
        return _ => window.removeEventListener('resize', debouncedHandleResize);
    }, [])

    return [ref, dimensions];
}