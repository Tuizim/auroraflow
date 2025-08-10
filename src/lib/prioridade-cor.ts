import { Prioridade } from "@/models/enums/prioridades";

export function DefinirCorTailWindText(prioridade: Prioridade):string{
    switch(prioridade){
        case Prioridade.Baixa:
            return '';
        case Prioridade.Media:
            return 'text-chart-2';
        case Prioridade.Alta:
            return 'text-chart-5';
        case Prioridade.Urgente:
            return 'text-chart-1';
    }
}