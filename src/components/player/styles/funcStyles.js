import styled from "styled-components"

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    
        &:after {
            display: ${(props) => props.active ? `block` : `none`};
            position: absolute;
            z-index: 12;
            content: '';
            top: 0;
            left: 8px;
            transform: rotate(180deg);
            width: 24px;
            height: 12px;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            background: rgba(40, 40, 40, 1);
        }
    button {
        margin: 8px 12px 0 12px;
        background: transparent;
        outline: none;
        border: none;
            svg {
                transition: all 0.15s;
                stroke: rgba(179, 179, 179, 1);
                width: 20px;
                height: 20px;
            }
            &:hover {
                svg {
                    stroke: rgba(255, 255, 255, 1);
                }
            }
        }
`;

export const DeviceOptions = styled.div`
    border-radius: 8px;
    padding: 24px 16px;
    width: auto;
    height: auto;
    position: absolute;
    z-index: 10;
    bottom: 100%;
    right: 50%;
    background: rgba(40, 40, 40, 1);
    box-shadow: 0 4px 12px 4px rgba(0, 0, 0, 0.5);
    .text {
        margin-bottom: 24px;
        white-space: nowrap;
        h3 {
            color: rgba(255, 255, 255, 1);
            font-size: 20px;
            letter-spacing: 0.3px;
        }
    }
    .banner {
        padding: 0 24px;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .devices {
        display: flex;
        flex-direction: column;
        .device_item {
            display: flex;
            padding: 8px 16px;
            transition: 0.2s;
            background: transparent;
            border-radius: 4px;
            &:hover {
                background: rgba(179, 179, 179, 0.2);
            }
            .icon {
                margin-right: 12px;
                svg {
                    width: 32px;
                    height: 32px;
                    stroke: rgba(255, 255, 255, 0.9);
                }
            }
            .informations {
                display: flex;
                flex-direction: column;
                .name {
                    align-self: flex-start;
                    span {
                        color: rgba(255, 255, 255, 0.9);
                        font-size: 15px;
                        font-weight: 600;
                        white-space: nowrap;
                    }
                }
                .device_status {
                    display: flex;
                    align-items: center;
                    svg {
                        height: 18px;
                        width: 18px;
                        margin-right: 4px;
                    }
                    span {
                       color: rgba(179, 179, 179, 0.8);
                       font-size: 12px;
                       font-weight: 600;
                       white-space: nowrap;
                    }
                }
            }
        }
    }
`;

export const VolumeFunc = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    margin-top: 2px;
    &:hover {
        svg {
            color: rgba(255, 255, 255, 0.9);
        }
    }
    svg {
        transition: all 0.15s;
        width: 30px;
        height: 30px;
        color: rgba(179, 179, 179, 0.9);
        margin-right: 6px;
    }
`;