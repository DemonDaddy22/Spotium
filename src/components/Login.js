import React from 'react';
import styled from 'styled-components';
import SpotifyLogo from '../assets/spotify';

const LoginButton = styled.a`
    align-items: center;
    background-color: #1db954;
    border: none;
    border-radius: 6px;
    color: #fff;
    display: inline-flex;
    font-size: 1.2rem;
    font-weight: 600;
    gap: 0.75rem;
    justify-content: center;
    letter-spacing: -0.5px;
    outline: none;
    padding: 20px 32px;
    text-decoration: none;
`;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=8d68b455cea241e1a1fd770c8dde2714&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => (
    <LoginButton href={AUTH_URL}>
        <SpotifyLogo height={18} width={18} />
        Log in with Spotify
    </LoginButton>
);

export default Login;
