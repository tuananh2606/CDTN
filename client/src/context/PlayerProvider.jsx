import { useState, createContext } from 'react';

export const PlayerContext = createContext({
    play: (playerId) => true,
    pause: (playerId) => true,
    isPlaying: (playerId) => false,
    muted: (playerId) => false,
});

function PlayerProvider({ children }) {
    // store the id of the current playing player
    const [playing, setPlaying] = useState('');

    // set playing to the given id
    const play = (playerId) => setPlaying(playerId);

    // unset the playing player
    const pause = () => setPlaying(false);

    // returns true if the given playerId is playing
    const isPlaying = (playerId) => playerId === playing;

    const muted = (playerId) => {
        console.log(playerId);
        playerId === playing;
    };

    return <PlayerContext.Provider value={{ play, pause, isPlaying, muted }}>{children}</PlayerContext.Provider>;
}

export default PlayerProvider;
