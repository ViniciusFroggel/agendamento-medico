import { doctors } from '@/data/mockData';
import { useAppointment } from '@/contexts/AppointmentContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const DoctorSelector = () => {
  const { selectDoctor, bookingState, setBookingStep } = useAppointment();

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialtyId === bookingState.specialty?.id
  );

  return (
    <div className="animate-slide-up">
      <Button
        variant="ghost"
        onClick={() => setBookingStep(1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para Especialidades
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Escolha seu Médico
        </h2>
        <p className="text-muted-foreground">
          Profissionais disponíveis em {bookingState.specialty?.name}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredDoctors.map((doctor, index) => (
          <button
            key={doctor.id}
            onClick={() => selectDoctor(doctor)}
            className={cn(
              "group flex items-start gap-4 p-5 rounded-2xl bg-card border-2 text-left transition-all duration-300",
              "hover:shadow-card-hover hover:scale-[1.01] hover:border-primary/50",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              bookingState.doctor?.id === doctor.id
                ? "border-primary shadow-card-hover"
                : "border-border shadow-card"
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {doctor.name}
              </h3>
              <p className="text-sm text-muted-foreground">{doctor.crm}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {doctor.experience} de experiência
                </span>
              </div>
              <p className="text-primary font-semibold mt-2">
                R$ {doctor.consultationFee.toFixed(2)}
              </p>
            </div>
            
            {bookingState.doctor?.id === doctor.id && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum médico disponível para esta especialidade no momento.
        </div>
      )}
    </div>
  );
};

export default DoctorSelector;
