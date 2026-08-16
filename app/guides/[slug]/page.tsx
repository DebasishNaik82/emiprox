import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GUIDE_DATA } from '@/lib/seo-data';
import { Calculator, ArrowLeft, BookOpen, Clock, Calendar, ChevronRight, HelpCircle } from 'lucide-react';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(GUIDE_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_DATA[slug];
  if (!guide) return { title: 'Guide Not Found | EMIProX' };

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `https://emiprox.vercel.app/guides/${slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://emiprox.vercel.app/guides/${slug}`,
      siteName: 'EMIProX Financial Tools',
      type: 'article',
      publishedTime: guide.publishedDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = GUIDE_DATA[slug];

  if (!guide) {
    notFound();
  }

  // Structured Data JSON-LD for Article & FAQ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        'headline': guide.title,
        'description': guide.description,
        'url': `https://emiprox.vercel.app/guides/${slug}`,
        'datePublished': guide.publishedDate,
        'author': {
          '@type': 'Organization',
          'name': 'EMIProX Financial Editorial Team'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'EMIProX',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://emiprox.vercel.app/icon.png'
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://emiprox.vercel.app'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Guides',
            'item': 'https://emiprox.vercel.app'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': guide.title,
            'item': `https://emiprox.vercel.app/guides/${slug}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': guide.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Calculator className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
              EMIProX
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb visible navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-md">{guide.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span className="bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-900">
              {guide.category} Guide
            </span>
            <div className="flex items-center gap-1 text-zinc-500">
              <Calendar size={14} />
              <span>{guide.publishedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-500">
              <Clock size={14} />
              <span>{guide.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
            {guide.title}
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Article Content */}
        <article className="space-y-10 text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed">
          {guide.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 pt-2">
                {section.heading}
              </h2>
              <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
                {section.content}
              </p>
              {section.subsections && section.subsections.map((sub, sIdx) => (
                <div key={sIdx} className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 my-4">
                  <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {sub.subheading}
                  </h3>
                  <p className="whitespace-pre-line text-base text-zinc-600 dark:text-zinc-400 font-mono">
                    {sub.content}
                  </p>
                </div>
              ))}
            </section>
          ))}

          {/* FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                <HelpCircle className="text-emerald-600" size={24} />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {guide.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Calculators Callout */}
          <div className="mt-12 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50">
            <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <BookOpen className="text-emerald-600" size={20} />
              Related Financial Calculators
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Put these concepts into practice using our accurate online calculation tools:
            </p>
            <div className="flex flex-wrap gap-3">
              {guide.relatedCalculators.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/calculators/${rc.slug}`}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:border-emerald-500 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{rc.name}</span>
                  <ChevronRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
