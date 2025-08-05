import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { Label } from './ui/label'
import { Pause, Play, SlidersHorizontal, X } from 'lucide-react'
import { useYoutubeProvider } from './youtube-provider'
import { TypographyH4, TypographyMuted } from './ui/typography'

export default function MusicaControlePopup() {
  const { youtubeContext } = useYoutubeProvider()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>
          <SlidersHorizontal />
          Controlar Música
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div>
            <TypographyH4>Tocando agora</TypographyH4>
            <TypographyMuted>{youtubeContext.nome}</TypographyMuted>
          </div>
          <div className='grid gap-5'>
            <div className='grid grid-cols-3'>
              <Label htmlFor='status-musica'>Pausar:</Label>
              <div id='status-musica' className='col-span-2 flex justify-center gap-5'>
                {
                  youtubeContext.status == true ?
                    <Button className='rounded-full cursor-pointer' size='icon' onClick={() => youtubeContext.setStatus(false)}>
                      <Pause />
                    </Button> :
                    <Button className='rounded-full cursor-pointer' size='icon' onClick={() => youtubeContext.setStatus(true)}>
                      <Play />
                    </Button>
                }
              </div>
            </div>
            <div className='grid grid-cols-3'>
              <Label htmlFor='volume-musica'>Volume:</Label>
              <Slider
                className='col-span-2'
                id='volume-musica'
                defaultValue={[youtubeContext.volume]}
                min={0} max={100}
                onValueChange={(valor) => { youtubeContext.setVolume(valor[0]) }}
              />
            </div>
            <Button className='cursor-pointer' variant='outline' onClick={()=> youtubeContext.setStatusPlayer(false)}>
              <X />
              Encerrar
            </Button>
          </div>
        </div></PopoverContent>
    </Popover>
  )
}
