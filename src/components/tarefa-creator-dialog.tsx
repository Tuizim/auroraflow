import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Tarefa } from '@/models/tarefa'
import { DialogClose } from '@radix-ui/react-dialog'
import TarefaForm from './tarefa-form'

type tarefaCreatorFormProps = {
    adicionarTarefa: (tarefa: Tarefa) => void;
}

export default function TarefaCreatorDialog({ adicionarTarefa }: tarefaCreatorFormProps) {
    const [open, setOpen] = useState(false)
    
    const submitFormulario = (tarefa: Tarefa)=>{
        adicionarTarefa(tarefa)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild aria-label='adicionar tarefa'>
                <Button className="cursor-pointer select-none">
                    <Plus />  Nova Tarefa
                </Button>
            </DialogTrigger>
            <DialogContent aria-label='Dialog criar tarefa'>
                <DialogHeader>
                    <DialogTitle>Crie sua tarefa</DialogTitle>
                    <DialogDescription>
                        Basta preencher os campos abaixo e sua tarefa estará pronta para ser realizada.
                    </DialogDescription>
                </DialogHeader>
                <TarefaForm
                    salvarTarefa={submitFormulario}
                />
                <DialogFooter>
                    <DialogClose aria-label='fechar dialog' asChild>
                        <Button variant='outline' type='reset' form='tarefa-form' aria-label='cancelar'>Cancelar</Button>
                    </DialogClose>
                    <Button type='submit' form='tarefa-form' aria-label='salvar'>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
