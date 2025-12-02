import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Shield, ArrowRight, Star } from 'lucide-react';
import { specialties, doctors } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Agende sua consulta{' '}
                <span className="text-primary">médica online</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Simplifique o cuidado com sua saúde. Encontre os melhores especialistas
                e agende consultas em poucos cliques.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="xl" asChild>
                  <Link to="/agendar">
                    Agendar Consulta
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/agendamentos">
                    Ver Agendamentos
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 mt-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Pacientes</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Médicos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in hidden md:block">
              <div className="bg-card rounded-3xl shadow-card-hover p-6 border border-border">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop"
                  alt="Médico atendendo paciente"
                  className="rounded-2xl w-full h-64 object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-card p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Próxima Consulta</p>
                      <p className="text-xs text-muted-foreground">Amanhã às 14:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Por que escolher o MedAgenda?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece uma experiência completa para cuidar da sua saúde
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: 'Agendamento Fácil', desc: 'Marque consultas em poucos cliques' },
              { icon: Clock, title: 'Horários Flexíveis', desc: 'Diversos horários disponíveis' },
              { icon: Users, title: 'Especialistas', desc: 'Profissionais qualificados' },
              { icon: Shield, title: 'Seguro e Confiável', desc: 'Seus dados protegidos' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Preview */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Especialidades</h2>
              <p className="text-muted-foreground">Encontre o especialista ideal para você</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/agendar">Ver todas</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.slice(0, 8).map((specialty) => (
              <Link
                key={specialty.id}
                to="/agendar"
                className="bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <span className="text-3xl block mb-2">{specialty.icon}</span>
                <h3 className="font-semibold text-foreground text-sm">{specialty.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors */}
      <section className="py-20 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossos Especialistas</h2>
            <p className="text-muted-foreground">Conheça alguns dos nossos médicos mais bem avaliados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doctor) => {
              const specialty = specialties.find(s => s.id === doctor.specialtyId);
              return (
                <div
                  key={doctor.id}
                  className="bg-background rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{specialty?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{doctor.experience}</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link to="/agendar">Agendar</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="gradient-primary rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para cuidar da sua saúde?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Agende sua consulta agora mesmo e tenha acesso aos melhores profissionais de saúde.
            </p>
            <Button size="xl" variant="secondary" asChild>
              <Link to="/agendar">
                Começar Agora
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">MedAgenda</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MedAgenda. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
