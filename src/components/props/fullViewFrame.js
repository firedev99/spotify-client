import React from 'react'
import styled from 'styled-components'
// components
import Frame from './frame'

const RecommendedContainer = styled.div`
    display: grid;
    row-gap: 24px;
    column-gap: 24px;
`;

export default function FullViewFrame({ width, albums, key, ref }) {
    return (
        <>
            <RecommendedContainer ref={ref} style={{ marginTop: "12px", gridTemplateColumns: width < 1206 ? `repeat(${Math.ceil(width / 220)}, minmax(0, 1fr)` : `repeat(6, minmax(0, 1fr)` }}>
                {albums && albums.map((album, index) => (
                    <Frame
                        key={`${key}-${index}`}
                        cover={album.cover}
                        name={album.name}
                        description={album.description}
                        id={album.id}
                        type={album.type}
                    />
                ))}
            </RecommendedContainer>
        </>
    )
}
