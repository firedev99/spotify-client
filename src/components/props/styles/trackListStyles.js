import styled from "styled-components/macro"

export const Wrapper = styled.div`
    width: 100%;
    padding: 0 32px;
    position: relative;
    z-index: 5;
    user-select: none;
    .popular {
        margin-top: -6px;
        margin-left: 4px;
        margin-bottom: 12px;
        font-size: 22px;
        color: rgba(255, 255, 255, 0.9);
    }
    ol {
        .single {
            /* grid-template-columns: 32px 1fr 60px; */
        }
        .single_item {
            /* grid-template-columns: 32px 1fr 0px; */
        }
        li {
            list-style: none;
            border-radius: 4px;
            padding: 10px;
            display: grid;
            grid-template-columns: 32px 1fr 40% 60px;
            margin: 4px 0;
            transition: all 0.25s; 
            @media(max-width: 1111px) {
                grid-template-columns: 32px 1fr 40px;
                .albumm {
                    display: none;
                }
            }
            .index {
                display: flex;
                align-items: center;
                .icon_single {
                    margin-left: -4px;
                }
                .icon_double {
                    margin-left: -2px;
                }
                .icon {
                    display: none;
                    transition: all 0.25s;
                    margin-top: 4px;
                    outline: none;
                    background: transparent;
                    border: none;
                    svg {
                        color: white;
                        fill: white;
                        width: 18px;
                        height: 18px;
                    }
                }
            }
            .image_single {
                display: flex;
                flex-direction: column;
            }
            .image {
                display: flex;
                align-items: center;
                @media(max-width: 1111px) {
                    display: none;
                }
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
            .album_artists {
                font-size: 14px;
                font-weight: 500;
                overflow: hidden;
                white-space: nowrap;
            }
            .duration {
                font-size: 14px;
                font-weight: 500;
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