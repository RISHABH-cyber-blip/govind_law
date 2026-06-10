import BlogCard from '@/components/blog/BlogCard'
import type { BlogPost } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Insights & Blog | Govind Legal Associates',
  description: 'Expert legal insights, case updates, and practical guidance on Delhi NCR law.',
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'civil-case',
    title: 'How to File a Civil Case in Delhi: Step-by-Step Legal Guide',
    excerpt: 'Learn how to file a civil case in Delhi — documents needed, courts involved, fees, and timelines explained clearly.',
    category: 'Civil Law',
    date: '3/22/2026',
    readTime: '1 min read',
    // REPLACE: Add actual blog image
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=700&q=80',
    href: '/blog/civil-case',
  },
  {
    slug: 'ndps-bail',
    title: 'How to Get Bail in NDPS Cases in Delhi: A Practical Legal Guide',
    excerpt:
      'Learn how to get bail in NDPS cases in Delhi with expert legal guidance. Understand the process, challenges, and legal strategies from experienced lawyers.',
    category: 'NDPS Law',
    date: '3/22/2026',
    readTime: '1 min read',
    // REPLACE: Add actual blog image
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=700&q=80',
    href: '/blog/ndps-bail',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 text-center relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />
        <div className="site-container relative z-10">
          <span className="section-tag">Our Blog</span>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-semibold" data-aos="fade-up">
            Legal Insights &amp; Updates
          </h1>
          <div className="gold-line mx-auto mt-4" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto mt-4">
            Practical legal knowledge to empower your decisions.
          </p>
        </div>
      </section>

      {/* Blog cards */}
      <section className="section-padding bg-black pt-0">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BLOG_POSTS.map((post, i) => (
              <div key={post.slug} data-aos="fade-up" data-aos-delay={String(i * 100)}>
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
