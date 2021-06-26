import { useEffect } from "react";

export default function useOnclickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // Do nothing if it was clicked outside the ref
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        window.addEventListener("mousedown", listener);
        window.addEventListener("touchstart", listener);

        return () => {
            window.removeEventListener("mousedown", listener);
            window.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
