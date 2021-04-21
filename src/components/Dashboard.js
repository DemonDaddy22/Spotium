import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import Track from './Track';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
    clientId: '8d68b455cea241e1a1fd770c8dde2714',
});

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100vh - 40px);
    padding: 1rem;
    width: 100%;

    input[type='text'] {
        background-color: transparent;
        border: 1px solid #1db95447;
        border-radius: 6px;
        color: #1db954;
        font-size: 1.5rem;
        outline: none;
        padding: 0.75rem 1rem;
        transition: border 0.2s ease;

        &:focus {
            border-color: #1db954;
            outline: none;
        }

        &::placeholder {
            color: #1db95497;
        }
    }

    .content {
        flex: 1;
        overflow-y: auto;
    }
`;

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        if (!search) return setSearchResults([]);

        let cancelRequest = false;
        spotifyApi
            .searchTracks(search)
            .then((res) => {
                if (cancelRequest) return;
                setSearchResults(
                    res.body.tracks.items.map((track) => {
                        const albumImage = track.album.images.reduce(
                            (smallest, curr) => (curr.height < smallest.height ? curr : smallest),
                            track.album.images[0]
                        );
                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumImage: albumImage.url,
                        };
                    })
                );
            })
            .catch((err) => console.error(err));

        return () => (cancelRequest = true);
    }, [search, accessToken]);

    const playTrack = (track) => {
        setPlayingTrack(track);
        setSearch('');
    };

    return (
        <DashboardContainer>
            <input
                type='text'
                value={search}
                placeholder='Search for a song...'
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            <div className='content'>
                {searchResults.map((track, index) => (
                    <Track key={`track-${index}`} track={track} playTrack={playTrack} />
                ))}
            </div>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </DashboardContainer>
    );
};

export default Dashboard;
