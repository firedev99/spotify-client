import React, { useState } from 'react'
// components
import ResultContainer from './resultContainer';
// styled-components
import { Wrapper, Input, TrackList } from "./styles/addPlaylistStyles"
// icons;
import { CrossIcon, SearchIcon } from '../../helpers/icons';

export default function AddToPlaylist() {
    const [value, setValue] = useState('');

    return (
        <Wrapper>
            <h1>Let's find something for your playlist</h1>
            <Input>
                <input
                    type="text"
                    name="add_item_input"
                    id="add_item_input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="search_icon">
                    <SearchIcon />
                </div>
                <button className="clear_icon" onClick={() => setValue('')}>
                    <CrossIcon />
                </button>
            </Input>
            <TrackList>
                {value.length !== 0 && <ResultContainer add={true} type="track" value={value} limit="10" />}
            </TrackList>
        </Wrapper>
    )
}
