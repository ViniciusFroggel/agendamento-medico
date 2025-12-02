import { specialties } from '@/data/mockData';
import { useAppointment } from '@/contexts/AppointmentContext';
import { cn } from '@/lib/utils';

const SpecialtySelector = () => {
  const { selectSpecialty, bookingState } = useAppointment();

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Escolha a Especialidade
        </h2>
        <p className="text-muted-foreground">
          Selecione a área médica para sua consulta
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specialties.map((specialty, index) => (
          <button
            key={specialty.id}
            onClick={() => selectSpecialty(specialty)}
            className={cn(
              "group relative p-6 rounded-2xl bg-card border-2 transition-all duration-300",
              "hover:shadow-card-hover hover:scale-[1.02] hover:border-primary/50",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              bookingState.specialty?.id === specialty.id
                ? "border-primary shadow-card-hover"
                : "border-border shadow-card"
            )}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl">{specialty.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {specialty.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {specialty.description}
                </p>
              </div>
            </div>
            
            {bookingState.specialty?.id === specialty.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialtySelector;
