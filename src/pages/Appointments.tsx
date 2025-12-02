import { useAppointment } from '@/contexts/AppointmentContext';
import AppointmentCard from '@/components/AppointmentCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import { updateAppointmentStatus } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Appointments = () => {
  const { appointments, refreshAppointments, cancelAppointment } = useAppointment();

  const handleCancel = (id: string) => {
    cancelAppointment(id);
    toast({
      title: "Consulta cancelada",
      description: "Sua consulta foi cancelada com sucesso.",
    });
  };

  const handleConfirm = (id: string) => {
    updateAppointmentStatus(id, 'confirmed');
    refreshAppointments();
    toast({
      title: "Consulta confirmada",
      description: "Sua presença foi confirmada.",
    });
  };

  const scheduledAppointments = appointments.filter(
    (apt) => apt.status === 'scheduled' || apt.status === 'confirmed'
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meus Agendamentos</h1>
            <p className="text-muted-foreground">
              Gerencie suas consultas médicas
            </p>
          </div>
          <Button asChild>
            <Link to="/agendar">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Link>
          </Button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-card">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhum agendamento
            </h2>
            <p className="text-muted-foreground mb-6">
              Você ainda não possui consultas agendadas.
            </p>
            <Button asChild>
              <Link to="/agendar">Agendar Primeira Consulta</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {scheduledAppointments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Próximas Consultas ({scheduledAppointments.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {scheduledAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onCancel={handleCancel}
                      onConfirm={handleConfirm}
                    />
                  ))}
                </div>
              </div>
            )}

            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Histórico ({pastAppointments.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {pastAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
