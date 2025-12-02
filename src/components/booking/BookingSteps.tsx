import { useAppointment } from '@/contexts/AppointmentContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const steps = [
  { number: 1, label: 'Especialidade' },
  { number: 2, label: 'Médico' },
  { number: 3, label: 'Data/Hora' },
  { number: 4, label: 'Confirmação' },
];

const BookingSteps = () => {
  const { bookingState } = useAppointment();

  if (bookingState.step === 5) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  bookingState.step > step.number
                    ? "gradient-primary text-primary-foreground"
                    : bookingState.step === step.number
                    ? "border-2 border-primary text-primary"
                    : "border-2 border-border text-muted-foreground"
                )}
              >
                {bookingState.step > step.number ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 hidden md:block",
                  bookingState.step >= step.number
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 md:w-16 h-0.5 mx-2 transition-colors duration-300",
                  bookingState.step > step.number
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
