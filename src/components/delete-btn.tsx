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
    funcaoExcluir: () => void;
};

export default function DeleteBtn({ funcaoExcluir }: deleteBtn) {
    return (
        <Dialog>
            <DialogTrigger
                aria-label='deletar item'
            >
                <Trash className="cursor-pointer hover:scale-110 transition-transform duration-200" />
            </DialogTrigger>
            <DialogContent aria-label="deletar dialog">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir este item?</DialogTitle>
                    <DialogDescription>
                        Essa ação é permanente e não poderá ser desfeita. Tudo bem seguir em frente?
                    </DialogDescription>
                </DialogHeader>
                <AlertDialogFooter>
                    <DialogClose asChild>
                        <Button className='cursor-pointer' variant='outline' aria-label="cancelar">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className='cursor-pointer' onClick={funcaoExcluir} aria-label="confirmar">Confirmar</Button>
                    </DialogClose>
                </AlertDialogFooter>
            </DialogContent>
        </Dialog>
    )
}
