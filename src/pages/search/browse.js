import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// components
import SpotifyLoader from '../../components/props/loader'
// context
import { LoginContext, TokenContext } from "../../utils/context"
import getWithToken from "../../utils/getWithToken"
// hooks
import { useDimesions } from "../../hooks/useDimesions"
// styled-components
import { GenreFrame, GenreWrapper } from "./styles/searchStyles"

function Frame({ bg, name, id, icon }) {
    return (
        <GenreFrame to={`/genre/${id}`} style={{ background: bg }}>
            <h3>{name}</h3>
            <div className="icon">
                <img src={icon} alt={`${name}-cat`} />
            </div>
        </GenreFrame>
    )
}

export default function BrowseGenres() {
    const auth = useContext(LoginContext);
    const spotifyToken = useContext(TokenContext);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genreRef, dimension] = useDimesions()

    useEffect(() => {
        const cancelSource = axios.CancelToken.source();

        if (auth) {
            // get recommended genres
            async function getGenres() {
                const request = getWithToken('https://api.spotify.com/v1/browse/categories?limit=46', spotifyToken, cancelSource);
                try {
                    const response = await request();
                    if (response.status === 200) {
                        let { categories: { items } } = response.data;
                        setCategories(items.map(item => ({ name: item.name, icon: item.icons[0].url, id: item.id })));
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getGenres();
        } else {
            setLoading(false);
        }

        return _ => cancelSource.cancel();
    }, [spotifyToken, auth])

    return loading ? <SpotifyLoader /> : (
        <GenreWrapper ref={genreRef} style={{ gridTemplateColumns: dimension.width < 1206 ? `repeat(${Math.ceil(dimension.width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
            {categories && categories.map((item, index) => (
                <Frame
                    key={`categories-${item.id}-${index}`}
                    bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                    name={item.name}
                    id={item.id}
                    icon={item.icon}
                />
            ))}
        </GenreWrapper>
    )
}
