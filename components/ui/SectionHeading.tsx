interface SectionHeadingProps {
  tag?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  center = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
        {title}
      </h2>
      <div className={`gold-line ${center ? 'mx-auto' : ''} mt-4`} />
      {subtitle && (
        <p className={`text-text-gray mt-3 text-base leading-relaxed ${center ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
