'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Dog, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const appointmentsFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(11, 'O telefone é obrigatório'),
  description: z.string().min(3, 'A descrição é obrigatória'),
});

type AppointmentsFormSchema = z.infer<typeof appointmentsFormSchema>;

export function AppointmentForm() {
  const form = useForm<AppointmentsFormSchema>({
    resolver: zodResolver(appointmentsFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  });

  function onSubmit(data: AppointmentsFormSchema) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>
          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tutorName"
              render={(field) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Nome do Tutor
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                        size={20}
                      />
                      <Input
                        placeholder="Nome do tutor"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="petName"
              render={(field) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Nome do pet
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Dog
                        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                        size={20}
                      />
                      <Input
                        placeholder="Nome do pet"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  doc
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={(field) => (
                <FormItem>
                  <FormLabel className="text-label-medium-size text-content-primary">
                    Descrição do serviço
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do serviço"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input type="text" {...form.register('tutorName')} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
