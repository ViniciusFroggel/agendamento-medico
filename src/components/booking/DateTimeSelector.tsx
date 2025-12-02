import { useState, useEffect } from 'react';
import { useAppointment } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock } from 'lucide-react';
import { generateTimeSlots } from '@/data/mockData';
import { TimeSlot } from '@/types/appointment';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DateTimeSelector = () => {
  const { bookingState, setBookingStep, selectDate, selectTime } = useAppointment();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (bookingState.date) {
      setTimeSlots(generateTimeSlots(bookingState.date));
    }
  }, [bookingState.date]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      selectDate(date);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="animate-slide-up">
      <Button
        variant="ghost"
        onClick={() => setBookingStep(2)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Médicos
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Selecione Data e Horário
        </h2>
        <p className="text-muted-foreground">
          Consulta com {bookingState.doctor?.name}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-card rounded-2xl border border-border p-4 shadow-card">
          <Calendar
            mode="single"
            selected={bookingState.date || undefined}
            onSelect={handleDateSelect}
            disabled={(date) => date < today}
            locale={ptBR}
            className="pointer-events-auto"
          />
        </div>

        {/* Time Slots */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              {bookingState.date
                ? format(bookingState.date, "dd 'de' MMMM", { locale: ptBR })
                : 'Selecione uma data'}
            </h3>
          </div>

          {bookingState.date ? (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && selectTime(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    slot.available
                      ? bookingState.time === slot.time
                        ? "gradient-primary text-primary-foreground shadow-button"
                        : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed line-through opacity-50"
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Selecione uma data no calendário para ver os horários disponíveis
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
