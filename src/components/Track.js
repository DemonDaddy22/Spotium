import React from 'react';
import styled from 'styled-components';

const TrackRow = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    margin: 0.5rem 0;

    img {
        height: 64px;
        width: 64px;
    }

    .track-info {
        margin-left: 1rem;
    }

    .track-title {
        color: #FFF;
    }

    .track-artist {
        color: #A7A7A7;
        font-size: 0.9rem;
    }
`;

const Track = ({ track, playTrack }) => <TrackRow onClick={() => playTrack(track)}>
    <img src={track.albumImage} alt={track.title} />
    <div className='track-info'>
        <div className='track-title'>{track.title}</div>
        <div className='track-artist'>{track.artist}</div>
    </div>
</TrackRow>;

export default Track;
