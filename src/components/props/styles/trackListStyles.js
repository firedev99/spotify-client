import styled from "styled-components/macro"

export const Wrapper = styled.div`
    width: 100%;
    padding: 0 32px;
    position: relative;
    z-index: 5;
    user-select: none;
    ol {
        li {
            list-style: none;
            border-radius: 4px;
            padding: 10px;
            display: grid;
            grid-template-columns: 32px 1fr 40% 60px;
            margin: 4px 0;
            transition: all 0.25s; 
            .index {
                display: flex;
                align-items: center;
                .icon {
                    display: none;
                    align-items: center;
                    margin: 4px 0 0 -4px;
                    transition: all 0.25s;
                    svg {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
            .image {
                display: flex;
                align-items: center;
                img {
                    width: 42px;
                    height: 42px;
                }
                span {
                    margin-left: 16px;
                    font-weight: 500;
                    text-align: left !important;
                }
            }
            .album_name {
                font-size: 14px;
                font-weight: 500;
            }
            .duration {
                font-size: 14px;
                font-weight: 500;
                text-align: right;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            span {
                &:first-of-type {
                    margin-right: 16px;
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.8);
                }
            } 
            &:first-of-type {
                background: none;
                position: relative;
                text-transform: uppercase;
                font-size: 14px;
                &:after {
                    content: '';
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    bottom: 2px;
                    border-radius: 1px;
                }
            }
            &:hover {
                background: rgba(179, 179, 179, 0.25);
                &:first-of-type {
                    background: transparent;
                }
                .index_id {
                    display: none;
                }
                .icon {
                    display: block;
                }
            }
        }
    }
`;