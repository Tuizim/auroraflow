import { Prioridade } from "@/models/enums/prioridades";

export function DefinirCorTailWind(prioridade: Prioridade):string{
    switch(prioridade){
        case Prioridade.Baixa:
            return '';
        case Prioridade.Media:
            return 'chart-2';
        case Prioridade.Alta:
            return 'chart-5';
        case Prioridade.Urgente:
            return 'chart-1';
    }
}