import type {
  Appointment,
  AppointmentPeriodDay,
  AppointmentsPeriod,
} from '@/types/appointments';
import type { Appointment as AppointmentPrisma } from '@/generated/prisma/client';

export function getPeriod(hour: number): AppointmentPeriodDay {
  if (hour >= 9 && hour < 12) {
    return 'morning';
  }
  if (hour >= 13 && hour < 18) {
    return 'afternoon';
  }
  return 'evening';
}

export function groupAppointmentsByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentsPeriod[] {
  const transformedAppointments: Appointment[] = appointments?.map(
    (appointment) => ({
      ...appointment,
      time: formatDateTime(appointment.scheduleAt),
      service: appointment.description,
      period: getPeriod(parseInt(formatDateTime(appointment.scheduleAt))),
    })
  );
  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );
  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );
  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
}
export function calculatePeriod(hour: number) {
  const isMorning = hour >= 9 && hour < 12;
  const isAfternoon = hour >= 13 && hour < 18;
  const isNight = hour >= 19 && hour < 21;
  return {
    isMorning,
    isAfternoon,
    isNight,
  };
}

export function formatDateTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  });
}
