import React from 'react'
// styled-components
import { Wrapper } from "./styles/progressStyles"

export default function Progressbar({ className }) {
    return (
        <Wrapper>
            <div className="progress_bar">
                <div className={`progress_bar_progress ${className}`} />
                <div className={`progress_bar_slider ${className}`} />
            </div>
        </Wrapper>
    )
}
