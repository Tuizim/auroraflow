import { Prioridade } from '@/models/enums/prioridades';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { TypographyMuted } from './ui/typography';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tarefa } from '@/models/tarefa';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';

type tarefaFormProps = {
    tarefa?: Tarefa;
    salvarTarefa: (tarefa: Tarefa) => void;
}
export default function TarefaForm({ tarefa, salvarTarefa }: tarefaFormProps) {
    type tarefaForm = {
        titulo: string;
        descricao: string;
        prioridade: Prioridade;
    }

    const form = useForm<tarefaForm>({
        mode: "onTouched",
        defaultValues: {
            titulo: tarefa ? tarefa.titulo : '',
            descricao: tarefa ? tarefa.descricao : '',
            prioridade: tarefa ? tarefa.prioridade : Prioridade.Baixa,
        },
    });

    const submit = (data: tarefaForm) => {
        if (tarefa) {
            tarefa.titulo = data.titulo
            tarefa.descricao = data.descricao
            tarefa.prioridade = data.prioridade
        }
        else {
            tarefa = new Tarefa(data.titulo, data.descricao, data.prioridade)
        }
        salvarTarefa(tarefa)
        form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-8' id="tarefa-form" aria-label="form de tarefa">
            <div className='grid w-full items-center gap-3'>
                <Label htmlFor='tarefa-titulo' aria-label='titulo'> Título</Label>
                <Input
                    id='tarefa-titulo'
                    type='text'
                    placeholder='Digite o título da tarefa aqui'
                    {...form.register("titulo",
                        {
                            required: "Título é obrigatório",
                            maxLength: {
                                value: 50,
                                message: "Máximo de 50 caracteres"
                            },
                            minLength: {
                                value: 3,
                                message: "Mínimo de 3 caracteres",
                            }
                        }
                    )}
                />
                {
                    form.formState.errors.titulo &&
                    <TypographyMuted>{form.formState.errors.titulo.message}</TypographyMuted>
                }
            </div>
            <div className='grid w-full items-center gap-3'>
                <Label htmlFor='tarefa-descricao' aria-label='descricao'>Descrição</Label>
                <Textarea
                    placeholder="Conte mais sobre essa tarefa aqui."
                    id="tarefa-descricao"
                    {...form.register('descricao')}
                />
            </div>
            <div className='grid w-full items-center gap-3'>
                <Label htmlFor='tarefa-prioridade' aria-label='seletor prioridade'>Prioridade</Label>
                <Controller
                    name='prioridade'
                    control={form.control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                                id="tarefa-prioridade"
                                className="w-full"
                            >
                                <SelectValue placeholder="Selecione a prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(Prioridade).map((valor) => (
                                    <SelectItem key={valor} value={valor}>
                                        {valor.charAt(0).toUpperCase() + valor.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
        </form>
    )
}
