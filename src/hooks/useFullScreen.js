
import { useState, useLayoutEffect } from "react";

export default function useFullScreen(ref) {
    const [isFullscreen, setIsFullscreen] = useState(
        document[getBrowserFullscreenElementProp()] != null
    );

    const setFullscreen = () => {
        if (ref.current == null) return;

        ref.current
            .requestFullscreen()
            .then(() => {
                setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
            })
            .catch(() => {
                setIsFullscreen(false);
            });
    };

    useLayoutEffect(() => {
        if (ref.current != null) {
            const refEl = ref.current;
            refEl.onfullscreenchange = () =>
                setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

            return _ => (refEl.onfullscreenchange = undefined);
        }
    });

    return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== "undefined") {
        return "fullscreenElement";
    } else if (typeof document.mozFullScreenElement !== "undefined") {
        return "mozFullScreenElement";
    } else if (typeof document.msFullscreenElement !== "undefined") {
        return "msFullscreenElement";
    } else if (typeof document.webkitFullscreenElement !== "undefined") {
        return "webkitFullscreenElement";
    } else {
        throw new Error("fullscreenElement is not supported by this browser");
    }
}