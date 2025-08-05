"use client";
import { YoutubePlayerType, useYoutubeContext } from '@/hooks/use-youtube-context';
import React, { createContext, useContext, ReactNode } from 'react';
import { YoutubePlayer } from './youtube-player';

type YoutubeProviderContextType = {
    youtubeContext: YoutubePlayerType
}
const YoutubeProviderContext = createContext<YoutubeProviderContextType | undefined>(undefined);

interface YoutubeProviderProps {
    children: ReactNode;
}

export function YoutubeProvider({ children }: YoutubeProviderProps) {
    const youtubeContext = useYoutubeContext()

    return (
        <YoutubeProviderContext.Provider value={{ youtubeContext }}>
            <YoutubePlayer youtubeContext={youtubeContext}></YoutubePlayer>
            {children}
        </YoutubeProviderContext.Provider>
    );
}
export function useYoutubeProvider() {
    const context = useContext(YoutubeProviderContext);
    if (!context) {
        throw new Error('YoutubeProviderContext must be used within a MyProvider');
    }
    return context;
}
