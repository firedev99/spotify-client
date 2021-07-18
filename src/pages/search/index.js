import React, { useState } from 'react'
// components
import Header from '../../components/header'
import ResultContainer from '../../components/props/resultContainer'
// icons
import { SearchIcon } from '../../helpers/icons'
import BrowseGenres from './browse'
// styled-components
import { Wrapper, SearchBar, Container } from './styles/searchStyles'

export default function SearchPage() {
    const [value, setValue] = useState('');

    function handleChange(event) {
        setValue(event.target.value);
    };

    return (
        <Wrapper>
            <Header />
            <Container>
                <SearchBar>
                    <div className="icon">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Artists, songs, or podcasts"
                        spellCheck="false"
                        value={value}
                        onChange={handleChange}
                    />
                </SearchBar>
                {value.length !== 0 ? (
                    <>
                        <ResultContainer
                            title="Songs"
                            value={value}
                            type="track"
                            limit="4"
                        />
                        <ResultContainer
                            title="Artists"
                            value={value}
                            type="artist"
                        />
                        <ResultContainer
                            title="Albums"
                            value={value}
                            type="album"
                        />
                        <ResultContainer
                            title="Playlists"
                            value={value}
                            type="playlist"
                        />
                    </>
                ) : (
                    <BrowseGenres />
                )}
            </Container>
        </Wrapper>
    )
}
