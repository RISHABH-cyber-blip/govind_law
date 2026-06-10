import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/types'

export default function BlogCard({ slug, title, excerpt, category, date, readTime, image, href }: BlogPost) {
  return (
    <Link href={href} className="block group">
      <div className="bg-dark-card border border-[#252525] border-t-4 border-t-gold rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_12px_48px_rgba(201,168,76,0.12)] h-full flex flex-col">
        {/* Image */}
        <div className="h-52 overflow-hidden">
          {/* REPLACE: Add actual blog post images */}
          <Image
            src={image}
            alt={title}
            width={700}
            height={208}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          <span className="text-xs uppercase tracking-[2px] text-gold font-medium mb-3 block">{category}</span>
          <h3 className="font-serif text-white text-xl leading-tight mb-3 group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="text-text-gray text-sm leading-relaxed mb-4 flex-1">{excerpt}</p>

          <div className="flex items-center gap-4 text-xs text-text-gray pt-4 border-t border-[#252525]">
            <span><i className="fas fa-user mr-1.5 text-gold" aria-hidden="true" />High-End Lawyers</span>
            <span><i className="fas fa-calendar mr-1.5 text-gold" aria-hidden="true" />{date}</span>
            <span><i className="fas fa-clock mr-1.5 text-gold" aria-hidden="true" />{readTime}</span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <span className="btn-outline text-sm py-2 px-5 inline-flex">
            Read More <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
