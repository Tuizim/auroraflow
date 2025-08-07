import React from 'react'
import { TypographyH2, TypographyP } from './ui/typography'
import { FileX, LucideIcon } from 'lucide-react'

type Predefinicao = {
    titulo: string;
    descricao: string;
    icone: LucideIcon;
};

type PredefinicaoTipo = 'NoContent';

export const predefinicoes: Record<PredefinicaoTipo, Predefinicao> = {
    NoContent: {
        titulo: 'Nada por aqui… ainda!',
        descricao: 'Que tal criar sua primeira tarefa e dar o primeiro passo para uma rotina mais leve?',
        icone:FileX,
    }
};

type noContentProps={
    tipo_conteudo: PredefinicaoTipo
}
export default function NoContent({tipo_conteudo}:noContentProps) {
    const predefinicao = predefinicoes[tipo_conteudo];
    const Icone = predefinicao.icone;
    return (
        <div className='m-auto opacity-20 flex flex-col text-center max-w-lg items-center gap-2 select-none'>
            <Icone className='w-25 h-25' strokeWidth={1.4} />
            <TypographyH2>{predefinicao.titulo}</TypographyH2>
            <TypographyP>{predefinicao.descricao}</TypographyP>
        </div>
    )
}
