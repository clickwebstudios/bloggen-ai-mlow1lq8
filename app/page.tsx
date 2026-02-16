'use client'

import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">BlogGen AI</div>
        <nav className="flex gap-4">
          {session ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Button onClick={() => signIn()} variant="outline">Sign In</Button>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Generate SEO-optimized blog posts in seconds
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate SEO-optimized blog posts in seconds
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => signIn()}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-blue-500" />}
            title="AI-Powered"
            description="Leverage cutting-edge AI technology to automate your workflow"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-500" />}
            title="Lightning Fast"
            description="Optimized performance ensures your work gets done in seconds"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-green-500" />}
            title="Secure & Private"
            description="Enterprise-grade security keeps your data safe and protected"
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20" id="pricing">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            name="Free"
            price="$0"
            description="Perfect for getting started"
            features={['Basic features', 'Up to 100 requests/month', 'Community support']}
            buttonText="Get Started"
            buttonVariant="outline"
          />
          <PricingCard
            name="Pro"
            price="$19"
            period="/month"
            description="For power users and teams"
            features={['All features', 'Unlimited requests', 'Priority support', 'API access']}
            buttonText="Upgrade to Pro"
            buttonVariant="default"
            popular
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} BlogGen AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function PricingCard({
  name,
  price,
  period = '',
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
}: {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: 'default' | 'outline'
  popular?: boolean
}) {
  return (
    <div className={`p-6 rounded-xl border ${popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
      {popular && (
        <div className="text-sm text-blue-500 font-medium mb-2">Most Popular</div>
      )}
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="text-4xl font-bold my-4">
        {price}<span className="text-lg font-normal text-gray-500">{period}</span>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm">
            <span className="text-green-500 mr-2">✓</span> {feature}
          </li>
        ))}
      </ul>
      <Button variant={buttonVariant} className="w-full">{buttonText}</Button>
    </div>
  )
}
