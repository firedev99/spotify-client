import styled from "styled-components/macro"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
    position: fixed;
    z-index: 99;
`;

export const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 512px;
    border-radius: 15px;
    background: #282828;
    padding: 24px;
        .inputs {
            width: 100%;
            display: flex;
        }
        .meta {
            margin-left: 16px;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 2px 0;
            .input {
                height: 100%;
                display: flex;
                flex-direction: column;
                position: relative;
                label {
                    position: absolute;
                    top: -10px;
                    left: 10px;
                    font-size: 12.5px;
                    z-index: 10;
                    font-weight: 600;
                    opacity: 0;
                    transition: all 0.2s;
                    &:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: #282828;
                        top: -6px;
                        z-index: -1;
                    }
                }
                input, textarea {
                    width: 100%;
                    background: rgba(179, 179, 179, 0.15);
                    border: none;
                    outline: none;
                    border-radius: 5px;
                    padding: 0 10px;
                    color: rgba(255, 255, 255, 1);
                    transition: all 0.2s;
                    font-family: 'Poppins', sans-serif;
                    &:focus {
                        box-shadow: 0 0 0  0.5pt rgba(179, 179, 179, 0.5);
                        background: rgba(179, 179, 179, 0.09);
                    }
                    &:focus ~ label {
                        opacity: 1;
                   }
                }
                input {
                    height: 40px;
                    font-size: 14.5px;
                }
                textarea {
                    height: 118px;
                    resize: none;
                    padding: 10px;
                    letter-spacing: 0.2px;
                    font-size: 14px;
                    line-height: 18px;
                }
            }
        }

        .submit {
            margin: 18px 0 14px 0;
            align-self: flex-end;
            button {
                outline: none;
                border: none;
                background: rgba(255, 255, 255, 1);
                color: rgba(0, 0, 0, 0.8);
                padding: 8px 28px;
                font-size: 13px;
                text-transform: uppercase;
                border-radius: 15px;
                font-weight: 600;
                &:hover {
                    transform: scale(1.06);
                    cursor: pointer;
                }
            }
        }
        .tag {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            h3 {
                font-size: 22px;
                color: rgba(255, 255, 255, 0.9);
            }
            button {
                background: transparent;
                outline: none;
                border: none;
                svg {
                    color: rgba(179, 179, 179, 1);
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }

        .info {
            line-height: 18px;
            font-size: 12px;
            font-weight: 600;
        }

        .cover {
            position: relative;
            box-shadow: 12px 24px 42px rgba(0, 0, 0, 0.25);
            .cover_prop {
                margin-top: 2px;
                background: rgba(179,179, 179, 0.05);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 0;
                z-index: -1;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                svg {
                    width: 72px;
                    height: 72px;
                    color: rgba(179, 179, 179, 0.8)
                }
            }
            .edit_icon {
                position: absolute;
                z-index: -1;
                left: 38px;
                top: 54px;
                display: flex;
                flex-direction: column;
                align-items: center;
                display: none;
                span {
                    color: rgba(255, 255, 255, 1);
                }
                svg {
                    fill: rgba(255, 255, 255, 1);
                }
            }
            input {
                &::-webkit-file-upload-button {
                    visibility: hidden;
                }
                width: 186px;
                height: 176px;
                color: transparent;
            }

            &:hover {
                input {
                    background: rgba(179,179, 179, 0.01);
                }
                .edit_icon {
                    display: flex;
                }
                .cover_prop {
                    svg {
                        display: none;
                    }
                }
            }
        }
`;