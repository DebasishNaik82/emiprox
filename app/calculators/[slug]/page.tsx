import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CALCULATOR_DATA } from '@/lib/seo-data';
import { Calculator, ArrowLeft, HelpCircle, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { CalculatorClientMount } from './CalculatorClientMount';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CALCULATOR_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = CALCULATOR_DATA[slug];
  if (!calc) return { title: 'Calculator Not Found | EMIProX' };

  return {
    title: calc.title,
    description: calc.description,
    alternates: {
      canonical: `https://emiprox.vercel.app/calculators/${slug}`,
    },
    openGraph: {
      title: calc.title,
      description: calc.description,
      url: `https://emiprox.vercel.app/calculators/${slug}`,
      siteName: 'EMIProX Financial Tools',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.title,
      description: calc.description,
    },
  };
}

export default async function CalculatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = CALCULATOR_DATA[slug];

  if (!calc) {
    notFound();
  }

  // Structured Data JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': calc.name,
        'url': `https://emiprox.vercel.app/calculators/${slug}`,
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'browser': 'Requires JavaScript. Requires HTML5.',
        'description': calc.description,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'INR'
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
            'name': 'Calculators',
            'item': 'https://emiprox.vercel.app'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': calc.name,
            'item': `https://emiprox.vercel.app/calculators/${slug}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': calc.faqs.map(faq => ({
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
            <span>All Calculators</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb visible navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">{calc.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            {calc.name}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {calc.description}
          </p>
        </div>

        {/* Interactive Calculator Mount */}
        <div className="mb-12 bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <CalculatorClientMount slug={slug} />
        </div>

        {/* LLM & SEO Information Structure (Server-Rendered HTML) */}
        <div className="space-y-10 bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200 dark:border-zinc-800">
          
          {/* Section 1: What is this calculator */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              1. What is the {calc.name}?
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
              {calc.whatIsIt}
            </p>
          </section>

          {/* Section 2: Who should use it */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              2. Who Should Use This Calculator?
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
              {calc.whoShouldUse}
            </p>
          </section>

          {/* Section 3: How does it work */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              3. How Does It Work?
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
              {calc.howItWorks}
            </p>
          </section>

          {/* Section 4: Formula used */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              4. Formula Used
            </h2>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm text-emerald-700 dark:text-emerald-400 whitespace-pre-line">
              {calc.formula}
            </div>
          </section>

          {/* Section 5: Step-by-step calculation example */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              5. Step-by-Step Calculation Example
            </h2>
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-5 space-y-3">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {calc.example.question}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Inputs & Details:</span> {calc.example.details}
              </p>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                <span className="font-bold">Result:</span> {calc.example.result}
              </p>
            </div>
          </section>

          {/* Section 6: What each input means */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
              6. What Each Input Means
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calc.inputs.map((input, idx) => (
                <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    {input.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {input.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Important assumptions */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              7. Important Assumptions
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
              {calc.assumptions.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 8: Limitations */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              8. Limitations
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
              {calc.limitations.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </section>

          {/* Section 9: Frequently Asked Questions */}
          <section>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <HelpCircle className="text-emerald-600" size={24} />
              9. Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {calc.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 10: Related Calculators & Guides */}
          <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <BookOpen className="text-emerald-600" size={24} />
              10. Related Calculators & Financial Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Related Calculators</h3>
                <ul className="space-y-2">
                  {calc.relatedCalculators.map((rc) => (
                    <li key={rc.slug}>
                      <Link 
                        href={`/calculators/${rc.slug}`}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 text-sm font-medium"
                      >
                        <ChevronRight size={14} />
                        {rc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Related Guides</h3>
                <ul className="space-y-2">
                  {calc.relatedGuides.map((rg) => (
                    <li key={rg.slug}>
                      <Link 
                        href={`/guides/${rg.slug}`}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 text-sm font-medium"
                      >
                        <ChevronRight size={14} />
                        {rg.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
