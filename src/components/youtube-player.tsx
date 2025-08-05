"use client";
import YouTube from "react-youtube";
import { YoutubePlayerType } from "@/hooks/use-youtube-context";
import React from 'react';
import { useYoutubePlayer } from "@/hooks/use-youtube-player";


const opts = {
    playerVars: {
        autoplay: 1
    }
};

type youtubePlayerProps = {
    youtubeContext: YoutubePlayerType
}

export function YoutubePlayer({ youtubeContext }: youtubePlayerProps) {
    const { eventoOnReady } = useYoutubePlayer()
    if (youtubeContext.id) {
        return (
            <YouTube
                className="hidden"
                videoId={youtubeContext.id}
                onReady={eventoOnReady}
                opts={opts}
                onError={(e) => {
                    console.warn("Erro controlado do YouTube:", e.data);
                }}
            />
        )
    }
    return null;

}