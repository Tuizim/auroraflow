import { Prioridade } from "./enums/prioridades";

export class Tarefa {
    id: string;
    titulo: string;
    descricao: string;
    concluido: boolean;
    prioridade: Prioridade;

    constructor(titulo: string, descricao: string, prioridade: Prioridade = Prioridade.Baixa) {
        this.id = crypto.randomUUID();
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluido = false;
        this.prioridade = prioridade;
    }
}