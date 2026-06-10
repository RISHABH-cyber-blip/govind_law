import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function AboutHero() {
  return (
    <section className="relative pt-36 pb-20 bg-black overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="site-container relative z-10 text-center">
        <span className="section-tag">Who We Are</span>
        <h1 className="font-serif text-white text-5xl md:text-6xl font-semibold mb-4" data-aos="fade-up">
          About Our Practice
        </h1>
        <div className="gold-line mx-auto" />
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          We are a dedicated legal practice committed to delivering fearless, ethical, and
          result-driven representation to every client who walks through our doors.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {[
            { target: 150, label: 'Satisfied Clients' },
            { target: 10, label: 'Years Experience' },
            { target: 500, label: 'Cases Handled' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-dark-card border border-gold/20 rounded-xl py-8 px-4"
            >
              <AnimatedCounter target={s.target} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
