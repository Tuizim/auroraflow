"use client";
import NoContent from "@/components/no-content";
import TarefaCreatorDialog from "@/components/tarefa-creator-dialog";
import TodoCard from "@/components/todo-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TypographyH2, TypographyH3, TypographyLead } from "@/components/ui/typography";
import { useTarefa } from "@/hooks/use-tarefas";
import { useState } from "react";

export default function Page() {
  const {
    tarefas,
    adicionarTarefa,
    mudarStatusTarefa,
    editarTarefa,
    excluirTarefa
  } = useTarefa()

  return (
    <>
      <header className="mb-20">
        <TypographyH2>Organize o Seu Flow</TypographyH2>
        <TypographyLead className="text-md">Aqui estão suas tarefas para hoje. Conquiste suas metas com foco. 🔥</TypographyLead>
      </header>
      <section className="mb-10 flex justify-between">
        <TypographyH3>Tarefas</TypographyH3>
        <TarefaCreatorDialog
          adicionarTarefa={adicionarTarefa}
        />
      </section>
      <section className="flex gap-2 flex-col">
        {
          tarefas.length > 0 ?
            tarefas.map(tarefa => (
              <TodoCard
                key={tarefa.id}
                tarefa={tarefa}
                mudarStatus={mudarStatusTarefa}
                excluirTarefa={excluirTarefa}
                editarTarefa={editarTarefa}
              />
            ))
            : <NoContent tipo_conteudo='NoContent' />
        }
      </section>
    </>
  )
}
