import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from 'lucide-react'

type verMaisInformacaoProps = {
    titulo: string;
    descricao: string;
}
export const VerMaisInformacao = ({ titulo, descricao }: verMaisInformacaoProps) => {
    return (
        <Dialog>
            <DialogTrigger
                aria-label='ver mais informações'
            >
                <Eye className='cursor-pointer hover:scale-110 transition-transform duration-200' />
            </DialogTrigger>
            <DialogContent aria-label='conteudo informações'>
                <DialogHeader>
                    <DialogTitle>
                        {titulo}
                    </DialogTitle>
                    <DialogDescription>
                        {descricao}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
