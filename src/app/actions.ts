'use server';

import { prisma } from '@/lib/prisma';
import { calculatePeriod } from '@/utils/appointment-utils';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const createAppointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
  phone: z.string(),
});

type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;

export async function createAppointment(data: CreateAppointmentSchema) {
  try {
    const { scheduleAt, description, petName, tutorName, phone } =
      createAppointmentSchema.parse(data);

    const hour = scheduleAt.getHours();

    const { isMorning, isAfternoon, isNight } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isNight) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h e 12h, 13h e 18 ou 19h e 21h',
      };
    }

    const existisAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });
    if (existisAppointment) {
      return {
        error: 'Este horário já esta reservado.',
      };
    }
    await prisma.appointment.create({
      data: {
        description,
        petName,
        phone,
        scheduleAt,
        tutorName,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}

export async function updateAppointment(
  id: string,
  data: CreateAppointmentSchema
) {
  try {
    const { scheduleAt, description, petName, tutorName, phone } =
      createAppointmentSchema.parse(data);

    const hour = scheduleAt.getHours();
    const { isAfternoon, isMorning, isNight } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isNight) {
      return {
        error:
          'Agendamentos só podem ser feitos entre 9h e 12h, 13h e 18 ou 19h e 21h',
      };
    }

    const existisAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
        id: {
          not: id,
        },
      },
    });

    if (existisAppointment) {
      return {
        error: 'Este horário já esta reservado.',
      };
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        description,
        petName,
        phone,
        scheduleAt,
        tutorName,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return {
      error: 'Erro ao atualizar agendamento',
    };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return {
      error: 'Erro ao remover agendamento',
    };
  }
}
