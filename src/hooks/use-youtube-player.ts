import { useEffect, useRef } from "react";
import { YouTubeEvent } from "react-youtube";
import { useYoutubeProvider } from "@/components/youtube-provider";

export function useYoutubePlayer() {
    const {youtubeContext} = useYoutubeProvider()
    const playerRef = useRef<YT.Player | null>(null)

    const eventoOnReady = (event: YouTubeEvent<YT.Player>) => {
        playerRef.current = event.target;
        if (playerRef.current == null) {
            return;
        }
        playerRef.current.playVideo();
        youtubeContext.setStatusPlayer(true);
        const data = playerRef.current.getVideoData();
        youtubeContext.setNome(data.title);
        playerRef.current.setVolume(youtubeContext.volume)
    }
    
    useEffect(()=>{
        playerRef.current?.setVolume(youtubeContext.volume)
    },[youtubeContext.volume])

    useEffect(()=>{
        youtubeContext.status? playerRef.current?.playVideo() : playerRef.current?.pauseVideo()
    },[youtubeContext.status])

    useEffect(()=>{
        if(youtubeContext.statusPlayer==false){
            playerRef.current?.stopVideo()
            youtubeContext.resetarTodosAtributos()
        }
    },[youtubeContext.statusPlayer])
    return { eventoOnReady }
}