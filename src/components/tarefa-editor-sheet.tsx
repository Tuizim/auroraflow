import React, { useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SquarePen } from 'lucide-react'
import { Tarefa } from '@/models/tarefa'
import TarefaForm from './tarefa-form'
import { Button } from './ui/button'

type tarefaEditorProps = {
    tarefa: Tarefa;
    editarTarefa: (tarefaEditada: Tarefa) => void;
}
export default function TarefaEditorSheet({ tarefa, editarTarefa }: tarefaEditorProps) {
    const [open, setOpen] = useState(false)

    const submitFormulario = (tarefa: Tarefa) => {
        editarTarefa(tarefa);
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                aria-label='editar tarefa'
            >
                <SquarePen className='cursor-pointer hover:scale-110 transition-transform duration-200' />
            </SheetTrigger>
            <SheetContent aria-label='sheet editar conteudo'>
                <SheetHeader>
                    <SheetTitle>Ajuste com carinho sua tarefa</SheetTitle>
                    <SheetDescription>
                        Aqui é o lugar para dar aquele toque especial. Edite com tranquilidade — estamos cuidando de cada detalhe com você.
                    </SheetDescription>
                </SheetHeader>
                <div className='p-4'>
                    <TarefaForm tarefa={tarefa} salvarTarefa={submitFormulario}/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button className='cursor-pointer' variant='outline' type='reset' form='tarefa-form' aria-label='cancelar' tabIndex={5}>Cancelar</Button>
                    </SheetClose>
                    <Button className='cursor-pointer' type='submit' form='tarefa-form' aria-label='salvar' tabIndex={4}>Salvar</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
