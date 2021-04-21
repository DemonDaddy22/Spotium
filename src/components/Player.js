import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri]);

    return accessToken ? (
        <SpotifyPlayer
            token={accessToken}
            play={play}
            uris={trackUri ? [trackUri] : []}
            callback={(state) => {
                if (!state.isPlaying) setPlay(false);
            }}
            showSaveIcon
            styles={{
                bgColor: '#141414',
                color: '#FFF',
                loaderColor: '#1db954',
                sliderColor: '#1db954',
                sliderHandleColor: '#FFF',
                trackArtistColor: '#A7A7A7',
                trackNameColor: '#FFF',
            }}
        />
    ) : null;
};

export default Player;
