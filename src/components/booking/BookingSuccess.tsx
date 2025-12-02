import { useAppointment } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BookingSuccess = () => {
  const { bookingState, resetBooking } = useAppointment();

  return (
    <div className="animate-scale-in max-w-lg mx-auto text-center">
      <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Agendamento Confirmado!
        </h2>
        <p className="text-muted-foreground mb-6">
          Sua consulta foi agendada com sucesso. Você receberá um e-mail de confirmação em breve.
        </p>

        <div className="bg-accent/50 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={bookingState.doctor?.avatar}
              alt={bookingState.doctor?.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-foreground">{bookingState.doctor?.name}</p>
              <p className="text-sm text-muted-foreground">{bookingState.specialty?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {bookingState.date && format(bookingState.date, "EEEE, dd 'de' MMMM 'às' ", { locale: ptBR })}
            {bookingState.time}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg">
            <Link to="/agendamentos">
              Ver Meus Agendamentos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" onClick={resetBooking} asChild>
            <Link to="/agendar">
              Fazer Novo Agendamento
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
