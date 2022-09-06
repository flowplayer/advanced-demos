/*
 * File: player.tsx
 * Project: React Example
 * Created: Thursday, 1st September 2022
 * Author: Mehdi Rashadatjou
 * -----
 * Copyright 2021 - 2022, ©Flowplayer
 * -----
 */

import "@flowplayer/player/flowplayer.css";

import React, { useEffect, useRef, useState } from "react";
import Flowplayer, { useFlowplayer } from "@flowplayer/react-flowplayer";

import { PAUSE, PLAYING } from "@flowplayer/player/core/events";
import { SOURCES, DEMO_TOKEN } from "./config";

// - Component
const Player = () => {
  // Get API handle in an asynchronous manner
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerApi = useFlowplayer(playerRef);

  const [demoPlaybackState, setDemoPlaybackState] = useState("paused");
  const [demoSrc, setDemoSrc] = useState(SOURCES[0]);

  const togglePlay = () => {
    if (!playerApi) return; // No API available
    playerApi.togglePlay();
  };

  const toggleSrc = () => {
    const nextIndex = SOURCES.indexOf(demoSrc) + 1;
    setDemoSrc(SOURCES[nextIndex] || SOURCES[0]);
  };

  const onHandleState = (ev: Event) => {
    if (ev.type === PAUSE) setDemoPlaybackState("paused");
    if (ev.type === PLAYING) setDemoPlaybackState("playing");
  }

  // Listen to player events for the demo
  useEffect(() => {
    if (!playerApi) return;
    playerApi.on([PAUSE, PLAYING], onHandleState);

    return () => {
      // Cleanup on unmount
      if (!playerApi) return;
      playerApi.off(PAUSE, onHandleState);
      playerApi.off(PLAYING, onHandleState);
    };
  }, [playerApi]);

  return (
    <div className="container">
      <h1>Flowplayer React Demo</h1>
      <div className="row">
        <div className="column">
          <Flowplayer
            src={demoSrc}
            token={DEMO_TOKEN}
            ref={playerRef}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">Playback state is: {demoPlaybackState}</div>
      </div>
      <div className="row">
        <div className="column">
          <h2>API handles</h2>
          <button onClick={togglePlay}>Play / pause</button>
        </div>
        <div className="column">
          <h2>Configuration changes</h2>
          <button onClick={toggleSrc}>Toggle source</button>
        </div>
      </div>
    </div>
  );
};

// - Exports
export default Player;
