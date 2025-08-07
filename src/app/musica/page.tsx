"use client";
import { TypographyH2, TypographyLead, TypographyList } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { useYoutubeProvider } from "@/components/youtube-provider";
import MusicaControlePopover from "@/components/musica-controle-popover";

export default function Page() {
  const [urlInput, setUrlInput] = useState("")
  const { youtubeContext } = useYoutubeProvider()
  return (
    <>
      <TypographyH2>Foco com Música</TypographyH2>
      <TypographyLead className="text-md">Trilhas suaves para potencializar seu foco e seu flow. 🎧</TypographyLead>
      <section className="mt-10 flex flex-col gap-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Link do Vídeo do YouTube:
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ex: https://www.youtube.com/watch?v=...."
                value={urlInput}
                onChange={(e) => { setUrlInput(e.target.value) }}
              />
              <Button className="cursor-pointer" onClick={() => { youtubeContext.setUrl(urlInput) }}>
                Carregar Música
              </Button>
            </div>
            {
              youtubeContext.statusPlayer &&
              <MusicaControlePopover />
            }
          </CardContent>
        </Card>
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>Como usar</AlertTitle>
          <AlertDescription>
            <TypographyList className="my-1">
              <li><strong>Cole o link</strong> completo de um vídeo do YouTube.</li>
              <li>Clique em <strong>"Carregar Música"</strong> para preparar o player.</li>
              <li>Quando o vídeo iniciar, os controles aparecerão na área <strong>"Controlar Música"</strong>.</li>
              <li>Aí é só curtir! Ajuste o volume, pause ou encerre quando quiser.</li>
              <li>Funciona com qualquer vídeo público do YouTube.</li>
            </TypographyList>
          </AlertDescription>
        </Alert>
      </section>
    </>
  )
}
