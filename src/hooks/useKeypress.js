import { useState, useEffect } from "react";

export default function useKeypress(targetKey) {
    // State to keep track of whether it was pressed or not
    const [keyPressed, setKeyPressed] = useState(false);

    // If pressed key is the target key
    const downHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };

    // If released key is the target key
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
        // eslint-disable-next-line
    }, []); //Empty array to ensure that this effect only runs on mount and unmount

    return keyPressed;
}
