import React, { useEffect, useRef, useState } from 'react'
// styled-components
import { Wrapper } from "./styles/progressStyles"

export default function Progressbar({ className, value, setValue, func }) {
    const wrapperRef = useRef(null);

    const [engaged, setEngaged] = useState(false);
    const [isDragging, setIsDraging] = useState(false);
    const [scrub, setScrub] = useState(null);

    // handle mouse enter event
    const handleEnter = () => {
        setEngaged(true);
    }

    // hanle mouse leave event
    const handleLeave = () => {
        if (!isDragging) {
            setEngaged(false);
        }
    };

    // handle mouse stoped hovering or leaving
    const handleMouseDown = (event) => {
        setIsDraging(true);
        const rect = wrapperRef.current.getBoundingClientRect();
        const offsetRatio = (event.pageX - rect.x) / rect.width;
        setScrub(offsetRatio);
    };

    useEffect(() => {
        const handleMouseUp = (event) => {
            setIsDraging(false);
            if (engaged) {
                setValue(scrub);
            }
            setScrub(null);
            if (!event.target.classList.contains('progress_bar') && !event.target.classList.contains('progress_bar_progress') && !event.target.classList.contains('progress_bar_slider')) {
                setEngaged(false)
            }
        };

        // handle event on drag
        const handleMove = (e) => {
            if (engaged && isDragging) {
                const rect = wrapperRef.current.getBoundingClientRect();
                let offsetRatio = (e.pageX - rect.x) / rect.width;

                if (offsetRatio < 0) {
                    offsetRatio = 0.001;
                } else if (offsetRatio > 1) {
                    offsetRatio = 1;
                }

                if (func) {
                    func(offsetRatio);
                }
                setScrub(offsetRatio);
            }
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleMouseUp);

        return _ => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [engaged, isDragging, setIsDraging, scrub, setValue, func])

    return (
        <Wrapper ref={wrapperRef} onMouseEnter={handleEnter} onMouseDown={handleMouseDown} onMouseLeave={handleLeave}>
            <div className="progress_bar">
                <div className={`progress_bar_progress`} style={{ transform: `translate(-${((1 - (scrub || value)) * 100).toFixed(2)}%)` }} />
            </div>
            <button className={`progress_bar_slider ${engaged && 'progress_bar_slider_engaged'} ${className}`} style={{ left: className === "progress_volume" ? `${(((scrub || value) * 100) + 1).toFixed(2)}%` : `${((scrub || value) * 100).toFixed(2)}%` }} />
        </Wrapper>
    )
}
