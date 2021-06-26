import React, { useContext, useEffect, useRef, useState } from 'react';
// context
import { LoginContext, UserContext } from "../../utils/context";
// components
import UserMenu from "./userMenu";
// hooks
import useOnclickOutside from "../../hooks/useOnclickOutside";
import useKeypress from "../../hooks/useKeypress";
// icons 
import { ChevronDownIcon } from "../../helpers/icons";
// styled-components
import { Wrapper, LocationNavigators, Navigations, UserNavigators, DisplayPicture } from "./styles/headerStyles";

export default function Header() {
    const menuRef = useRef(null);
    const [toggle, setToggle] = useState(false);

    const auth = useContext(LoginContext);
    const user = useContext(UserContext);
    const { country, display_name, images, id } = user;

    const escKey = useKeypress('Escape');
    useOnclickOutside(menuRef, () => setToggle(false));

    useEffect(() => {
        if (escKey) {
            setToggle(false)
        }
    }, [escKey])

    return (
        <Wrapper>
            <LocationNavigators />
            {auth ? (
                <UserNavigators ref={menuRef} style={{ backgroundColor: toggle && `rgba(179, 179, 179, 0.15)` }} onClick={() => setToggle(!toggle)}>
                    <DisplayPicture>
                        <img src={images && images[0].url} alt={`user-dp`} />
                    </DisplayPicture>
                    <span>{display_name}</span>
                    <ChevronDownIcon />
                    {toggle && (<UserMenu userID={id} country={country} />)}
                </UserNavigators>
            ) : (
                <Navigations>
                    <a draggable="false" target="_blank" rel="noreferrer noopener" href="https://www.spotify.com/bd-en/signup/?forward_url=https%3A%2F%2Fopen.spotify.com%2F">Sign up</a>
                    <a draggable="false" className="radius_button" rel="noreferrer noopener" href={`${process.env.REACT_APP_BACK_URI}/login`}>Log in</a>
                </Navigations>
            )}
        </Wrapper>
    )
}