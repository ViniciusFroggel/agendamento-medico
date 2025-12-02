import { Appointment } from '@/types/appointment';
import { doctors, specialties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, X, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
}

const statusConfig = {
  scheduled: {
    label: 'Agendado',
    className: 'bg-warning/10 text-warning',
  },
  confirmed: {
    label: 'Confirmado',
    className: 'bg-success/10 text-success',
  },
  completed: {
    label: 'Concluído',
    className: 'bg-muted text-muted-foreground',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-destructive/10 text-destructive',
  },
};

const AppointmentCard = ({ appointment, onCancel, onConfirm }: AppointmentCardProps) => {
  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  const specialty = specialties.find((s) => s.id === appointment.specialtyId);
  const status = statusConfig[appointment.status];
  const appointmentDate = new Date(appointment.date);
  const isPast = appointmentDate < new Date();
  const canModify = appointment.status === 'scheduled' && !isPast;

  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border p-5 shadow-card transition-all duration-300 hover:shadow-card-hover",
      appointment.status === 'cancelled' && "opacity-60"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={doctor?.avatar}
            alt={doctor?.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{doctor?.name}</h3>
            <p className="text-sm text-muted-foreground">{specialty?.name}</p>
          </div>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", status.className)}>
          {status.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{format(appointmentDate, "dd 'de' MMMM", { locale: ptBR })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>{appointment.time}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        <p><strong>Paciente:</strong> {appointment.patientName}</p>
        <p><strong>E-mail:</strong> {appointment.patientEmail}</p>
      </div>

      {canModify && (
        <div className="flex gap-2 pt-4 border-t border-border">
          {onConfirm && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-success border-success hover:bg-success hover:text-success-foreground"
              onClick={() => onConfirm(appointment.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar
            </Button>
          )}
          {onCancel && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => onCancel(appointment.id)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
