'use server';

import { prisma } from '@/lib/prisma';
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
    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isNight = hour >= 19 && hour < 21;

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
