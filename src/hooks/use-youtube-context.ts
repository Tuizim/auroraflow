import { useEffect, useState } from "react";

function getYouTubeID(url: string) {
    const regExp = /(?:youtube\.com.*(?:v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
}

export type YoutubePlayerType = {
    url: string,
    setUrl: (url: string) => void,
    status: boolean,
    setStatus: (status: boolean) => void,
    volume: number,
    setVolume: (volume: number) => void,
    statusPlayer: boolean,
    setStatusPlayer: (status: boolean) => void,
    nome: string,
    setNome: (nome: string) => void,
    id: string,
    setId: (id: string) => void
    resetarTodosAtributos: () => void;
}


export function useYoutubeContext() {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState(true);
    const [volume, setVolume] = useState(50);
    const [statusPlayer, setStatusPlayer] = useState(false);
    const [nome, setNome] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setId(getYouTubeID(url))
    }, [url])

    const resetarTodosAtributos = () => {
        setUrl("");
        setStatus(true);
        setVolume(50);
        setStatusPlayer(false);
        setNome("");
        setId("")
    }
    
    const youtubeContext: YoutubePlayerType = {
        url, setUrl,
        status, setStatus,
        volume, setVolume,
        statusPlayer, setStatusPlayer,
        nome, setNome,
        id, setId,
        resetarTodosAtributos
    }
    return youtubeContext;
}