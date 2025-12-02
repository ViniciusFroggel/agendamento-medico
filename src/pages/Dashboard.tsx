import { useAppointment } from '@/contexts/AppointmentContext';
import StatsCard from '@/components/StatsCard';
import AppointmentCard from '@/components/AppointmentCard';
import { Calendar, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { updateAppointmentStatus } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard = () => {
  const { appointments, refreshAppointments } = useAppointment();

  const totalAppointments = appointments.length;
  const scheduledCount = appointments.filter((a) => a.status === 'scheduled').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'cancelled').length;

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    return (
      aptDate.toDateString() === today.toDateString() &&
      (apt.status === 'scheduled' || apt.status === 'confirmed')
    );
  });

  const upcomingAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate >= new Date() && (apt.status === 'scheduled' || apt.status === 'confirmed');
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const handleCancel = (id: string) => {
    updateAppointmentStatus(id, 'cancelled');
    refreshAppointments();
    toast({
      title: "Consulta cancelada",
      description: "A consulta foi cancelada com sucesso.",
    });
  };

  const handleConfirm = (id: string) => {
    updateAppointmentStatus(id, 'confirmed');
    refreshAppointments();
    toast({
      title: "Consulta confirmada",
      description: "A consulta foi confirmada.",
    });
  };

  return (
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral dos agendamentos • {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total de Agendamentos"
            value={totalAppointments}
            icon={Calendar}
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Agendados"
            value={scheduledCount}
            subtitle="Aguardando confirmação"
            icon={Clock}
          />
          <StatsCard
            title="Confirmados"
            value={confirmedCount}
            subtitle="Prontos para atendimento"
            icon={CheckCircle}
          />
          <StatsCard
            title="Taxa de Conclusão"
            value={`${totalAppointments > 0 ? Math.round((completedCount / totalAppointments) * 100) : 0}%`}
            icon={TrendingUp}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Today's Appointments */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Consultas de Hoje ({todayAppointments.length})
            </h2>
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-8 text-center shadow-card">
                <p className="text-muted-foreground">
                  Nenhuma consulta agendada para hoje.
                </p>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Próximas Consultas
            </h2>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-8 text-center shadow-card">
                <p className="text-muted-foreground">
                  Nenhuma consulta futura agendada.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4 shadow-card text-center">
            <p className="text-2xl font-bold text-foreground">{scheduledCount + confirmedCount}</p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card text-center">
            <p className="text-2xl font-bold text-success">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Concluídas</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card text-center">
            <p className="text-2xl font-bold text-destructive">{cancelledCount}</p>
            <p className="text-sm text-muted-foreground">Canceladas</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card text-center">
            <p className="text-2xl font-bold text-primary">{todayAppointments.length}</p>
            <p className="text-sm text-muted-foreground">Hoje</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
