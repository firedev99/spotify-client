import styled from "styled-components"

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 12px;
    display: flex;
    align-items: center;
    .progress_bar_slider {
        background-color: #fff;
        border: 0;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin-left: -6px;
        z-index: 100;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
        opacity: 0;
        position: absolute;
    }
    .progress_volume {
        top: -8px;
    }
    .progress_bar_slider_engaged {
        opacity: 1;
    }
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