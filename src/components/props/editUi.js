import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
// utils
import updateWithToken from '../../utils/updateWithToken'
import { TokenContext, UserContext } from "../../utils/context"
// hooks
import useOnclickOutside from "../../hooks/useOnclickOutside"
// icons
import { CrossIcon, MusicIcon } from "../../helpers/icons"
// styled-components
import { Container, Wrapper } from "./styles/editStyles"

export default function EditUi({ toggle, setToggle, update = false, id, pDescription, pTitle, pCover, ...props }) {
    const spotifyToken = useContext(TokenContext);
    const user = useContext(UserContext);

    const modalRef = useRef(null);
    const [title, setTitle] = useState(pTitle ? pTitle : 'Firey Playlist 🔥');
    const [description, setDescription] = useState(pDescription ? pDescription : '');
    const [cover, setCover] = useState(pCover ? pCover : '');
    const [base64, setBase64] = useState('');

    // handle click outside the ref
    useOnclickOutside(modalRef, () => {
        setToggle(false);
    });

    // handle file on change
    function handleFileChange(event) {
        let file = event.target.files[0];
        if (validateFile(file)) {
            file.preview = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onload = handleReaderLoaded;
            reader.readAsBinaryString(file);
            setCover(file.preview);
        }
    };

    // validation for file field
    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (typeof file !== 'undefined' && validTypes.indexOf(file.type) === -1) {
            console.log('Please upload an image😶');
            return false;
        }

        if (typeof file !== 'undefined' && file.size > 1024 * 256) {
            console.log("Image can't be more than 256KB");
            return false;
        }
        return true;
    };

    // convert image into data:image/jepg base64
    function handleReaderLoaded(readerEvent) {
        let binaryString = readerEvent.target.result;
        setBase64(btoa(binaryString));
    };

    // update a playlist
    function updatePlaylist(event) {
        event.preventDefault();
        async function handleUpdate() {
            const upBody = {
                "name": title,
                "description": description,
                "public": false
            }
            try {
                // update playlist details 
                const request = updateWithToken(`https://api.spotify.com/v1/playlists/${id}`, spotifyToken, upBody);
                const response = await request();
                if (response.status === 200) {
                    //  upload playlist cover 
                    if (base64.length !== 0) {
                        const uploadOptions = {
                            url: `https://api.spotify.com/v1/playlists/${id}/images`,
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'image/jpeg',
                                'Authorization': `Bearer ${spotifyToken}`
                            },
                            data: base64,
                        }
                        try {
                            const response = await axios(uploadOptions);
                            if (response.status === 202) {
                                setToggle(false);
                                setTimeout(() => {
                                    typeof window !== 'undefined' && window.location.reload();
                                }, 1000)
                            } else {
                                console.log('opps, something happend!')
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        setToggle(false);
                        setTimeout(() => {
                            typeof window !== 'undefined' && window.location.reload();
                        }, 1000)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        handleUpdate();
    }

    // create a playlist
    function createPlaylist(event) {
        event.preventDefault();
        if (typeof user !== 'undefined') {
            async function handleCreation() {
                // post playlist name, description
                const body = {
                    "name": title,
                    "description": description,
                    "public": false
                }
                const options = {
                    url: `https://api.spotify.com/v1/users/${user.id}/playlists`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${spotifyToken}`
                    },
                    data: body
                }

                try {
                    const response = await axios(options);
                    if (response.status === 201) {
                        //  upload playlist cover 
                        if (base64.length !== 0) {
                            const uploadOptions = {
                                url: `https://api.spotify.com/v1/playlists/${response.data.id}/images`,
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'image/jpeg',
                                    'Authorization': `Bearer ${spotifyToken}`
                                },
                                data: base64,
                            }
                            try {
                                const response = await axios(uploadOptions);
                                if (response.status === 202) {
                                    setToggle(false);
                                    setTimeout(() => {
                                        typeof window !== 'undefined' && window.location.reload();
                                    }, 1000)
                                } else {
                                    console.log('opps, something happend!')
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            setToggle(false);
                            setTimeout(() => {
                                typeof window !== 'undefined' && window.location.reload();
                            }, 1000)
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            handleCreation();
        }
    };

    return (
        <Container>
            <Wrapper ref={modalRef} onSubmit={update ? updatePlaylist : createPlaylist} {...props}>
                <div className="tag">
                    <h3>Edit details</h3>
                    <button onClick={() => setToggle(false)}>
                        <CrossIcon />
                    </button>
                </div>
                <div className="inputs">
                    <div className="cover">
                        <input
                            type="file"
                            name="prop_cover"
                            accept="image/.jpg, image/.jpeg, image/.png"
                            onChange={handleFileChange}
                        />
                        <div className="cover_prop">
                            {cover === "" ? <MusicIcon /> : <img src={cover} alt="preview_blob" />}
                        </div>
                        <div className="edit_icon">
                            <svg role="img" height="48" width="48" aria-hidden="true" viewBox="0 0 48 48"><path d="M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z"></path></svg>
                            <span>Choose photo</span>
                        </div>
                    </div>
                    <div className="meta">
                        <div className="input">
                            <input
                                id="prop_name"
                                name="prop_name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                spellCheck="false"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <label htmlFor="prop_name">Name</label>
                        </div>
                        <div className="input">
                            <textarea
                                id="prop_description"
                                name="prop_description"
                                spellCheck="false"
                                autoComplete="off"
                                value={description}
                                placeholder="Add an optional description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="prop_description">Description</label>
                        </div>
                    </div>
                </div>
                <div className="submit">
                    <button type="submit">Save</button>
                </div>
                <div className="info">
                    <span>
                        By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
                    </span>
                </div>
            </Wrapper>
        </Container>
    )
}
