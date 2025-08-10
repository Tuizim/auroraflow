"use client";
import React from 'react'
import { Card, CardContent } from './ui/card'
import { TypographyH3 } from './ui/typography'
import CheckContent from './check-content';
import { Tarefa } from '@/models/tarefa';
import DeleteBtn from './delete-btn';
import TarefaEditorSheet from './tarefa-editor-sheet';
import { VerMaisInformacao } from './ver-mais-informacao';
import { Badge } from './ui/badge';

type TarefaCardProps = {
    tarefa: Tarefa;
    mudarStatus: (status: boolean, tarefaId: string) => void;
    excluirTarefa: (id: string) => void;
    editarTarefa: (tarefaEditada: Tarefa) => void;
};

export default function TarefaCard({ tarefa, mudarStatus, excluirTarefa, editarTarefa }: TarefaCardProps) {
    const cardClassNameConcluido = tarefa.concluido ? "opacity-50" : ""
    const mudarStatusFunction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        mudarStatus(!tarefa.concluido, tarefa.id)
    }
    const excluirTarefaPorId = () => { excluirTarefa(tarefa.id) }
    return (
        <Card aria-label='card tarefa' className={`flex-grow max-w-full gap-5 ${cardClassNameConcluido}`}>
            <CardContent className='flex justify-between'>
                <div className='flex items-center gap-5 w-full min-w-0'>
                    <CheckContent
                        status={tarefa.concluido}
                        mudarStatus={mudarStatusFunction}
                    />
                    <Badge aria-label='prioridade' className='select-none' variant='secondary'>{tarefa.prioridade}</Badge>
                    <TypographyH3 className='select-none truncate w-2xl'>
                        {tarefa.titulo}
                    </TypographyH3>
                </div>
                <div className='flex items-center gap-3'>
                    {tarefa.descricao.length > 0 &&
                        <VerMaisInformacao titulo={tarefa.titulo} descricao={tarefa.descricao} />
                    }
                    <TarefaEditorSheet editarTarefa={editarTarefa} tarefa={tarefa} />
                    <DeleteBtn funcaoExcluir={excluirTarefaPorId} />
                </div>
            </CardContent>
        </Card >
    )
}
