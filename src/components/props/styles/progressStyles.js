import styled from "styled-components"

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 12px;
    display: flex;
    align-items: center;
    .progress_bar {
        width: 100%;
        height: 4px;
        background: rgba(83, 83, 83, 1);
        border-radius: 2px;
        display: flex;
        overflow: hidden;
        .progress_bar_progress{
            background: rgba(179, 179, 179, 1);
            border-radius: 2px;
            height: 4px;
            width: 100%;
            transform: translateX(-100%);
        }
    }
`;