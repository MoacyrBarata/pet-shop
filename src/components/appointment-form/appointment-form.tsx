'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function AppointmentForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agende um atendimento</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente para realizar o agendamento
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
