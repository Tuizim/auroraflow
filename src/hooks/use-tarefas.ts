"use client";
import { Tarefa } from "@/models/tarefa";
import localforage from "localforage";
import { useEffect, useState } from "react";

export function useTarefa() {
    const STORAGE_KEY = "tarefas"
    
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    
    useEffect(() => {
        async function carregarTarefas() {
            const dados = await localforage.getItem<Tarefa[]>(STORAGE_KEY);
            if (dados) setTarefas(dados);
        }
        carregarTarefas();
    }, []);
    
    useEffect(() => {
        localforage.setItem(STORAGE_KEY, tarefas);
    }, [tarefas]);
    
    const adicionarTarefa = (tarefa: Tarefa) => {
        setTarefas((prev) => [...prev, tarefa])
    }
    
    const excluirTarefa = (tarefaId: string) => {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== tarefaId))
    }
    
    const editarTarefa = (tarefaEditada: Tarefa) => {
        setTarefas(prev => {
            const atualizadas = prev.map(tarefa =>
                tarefa.id === tarefaEditada.id ? tarefaEditada : tarefa
            );
            return atualizadas;
        });
    };
    
    const mudarStatusTarefa = (status: boolean, tarefaId: string) => {
        setTarefas(prev => {
            prev.forEach(tarefa => {
                if (tarefa.id === tarefaId) {
                    tarefa.concluido = status;
                }
            });
            return [...prev];
        });
    };
    return {
        tarefas,
        adicionarTarefa,
        excluirTarefa,
        editarTarefa,
        mudarStatusTarefa
    }

}