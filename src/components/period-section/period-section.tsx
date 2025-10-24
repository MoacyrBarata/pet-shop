import type { AppointmentsPeriod } from '@/types/appointments';
import { Sun, Cloudy, Moon } from 'lucide-react';
import { AppointmentCard } from '../appoitment-card';

type PeriodSectionProps = {
  period: AppointmentsPeriod;
};

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloudy className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

export function PeriodSection({ period }: PeriodSectionProps) {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex item px-5 py-3 justify-between border-b border-[#2e2c30]">
        <div className="flex items-center gap-8">
          {periodIcons[period?.type]}
          <h2 className="text-label-large-size text-content-primary">
            {period?.title}
          </h2>
        </div>
        <span className="text-label-large-size text-content-secondary">
          {period.timeRange}
        </span>
      </div>
      {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            {period.appointments.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointment={appointment}
                isFirstInSection={index === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Nenhum agendamento para este período</p>
      )}
    </section>
  );
}
