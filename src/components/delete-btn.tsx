import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertDialogFooter } from "./ui/alert-dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"

type deleteBtn = {
    id: string;
    excluir: (id: string) => void;
};

export default function DeleteBtn({ excluir, id }: deleteBtn) {
    return (
        <Dialog>
            <DialogTrigger
                aria-label='deletar tarefa'
            >
                <Trash className="cursor-pointer hover:scale-110 transition-transform duration-200"></Trash>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir este item?</DialogTitle>
                    <DialogDescription>
                        Essa ação é permanente e não poderá ser desfeita. Tudo bem seguir em frente?
                    </DialogDescription>
                </DialogHeader>
                <AlertDialogFooter>
                    <DialogClose asChild>
                        <Button className='cursor-pointer' variant='outline'>Cancelar</Button>
                    </DialogClose>
                    <Button className='cursor-pointer' onClick={() => excluir(id)}>Confirmar</Button>
                </AlertDialogFooter>
            </DialogContent>
        </Dialog>
    )
}
