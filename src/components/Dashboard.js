import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import Track from './Track';
import Player from './Player';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: '8d68b455cea241e1a1fd770c8dde2714',
});

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100vh - 114px);
    width: 100%;

    input[type='text'] {
        background-color: transparent;
        border: 1px solid #1db95447;
        border-radius: 6px;
        color: #1db954;
        font-size: 1.5rem;
        margin: 0 1rem;
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
        margin: 0 1rem;
        overflow-y: auto;
    }

    .lyrics {
        color: #F7F7F7;
        font-size: 1.2rem;
        text-align: center;
        white-space: pre;
    }
`;

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState('');

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

    useEffect(() => {
        if (!playingTrack) return;
        axios
            .get('http://localhost:3031/lyrics', {
                params: {
                    track: playingTrack.track,
                    artist: playingTrack.artist,
                },
            })
            .then((res) => setLyrics(res.data.lyrics))
            .catch((err) => console.error(err));
    }, [playingTrack]);

    const playTrack = (track) => {
        setPlayingTrack(track);
        setSearch('');
        setLyrics('');
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
                {searchResults.length ? (
                    searchResults.map((track, index) => (
                        <Track key={`track-${index}`} track={track} playTrack={playTrack} />
                    ))
                ) : (
                    <div className='lyrics'>{lyrics}</div>
                )}
            </div>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </DashboardContainer>
    );
};

export default Dashboard;
