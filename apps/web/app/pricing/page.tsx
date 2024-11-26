import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - ShipKit',
  description: 'Simple, transparent pricing for teams of all sizes.',
};

const tiers = [
  {
    name: 'Community',
    price: 'Free',
    description: 'Perfect for personal projects and learning.',
    features: [
      'Core features',
      'Public repositories',
      'Community support',
      'Basic analytics',
      'Standard templates',
      'Documentation access',
    ],
    cta: 'Get Started',
    href: '/sign-up',
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Everything you need for professional development.',
    features: [
      'All Community features',
      'Private repositories',
      'Priority support',
      'Custom branding',
      'Team collaboration',
      'Advanced analytics',
      'Custom templates',
      'API access',
    ],
    cta: 'Start Free Trial',
    href: '/sign-up?plan=pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Advanced features for larger organizations.',
    features: [
      'All Pro features',
      'Custom development',
      'Dedicated support',
      'Training & onboarding',
      'SLA guarantees',
      'Advanced security',
      'Custom integrations',
      'Compliance support',
    ],
    cta: 'Contact Sales',
    href: '/contact',
  },
];

const PricingPage = () => (
  <div className="container py-20 sm:py-32">
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Simple, transparent pricing
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Choose the perfect plan for your team. All plans include a 14-day free
        trial.
      </p>
    </div>

    <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`flex flex-col p-8 ${
            tier.featured
              ? 'border-primary ring-2 ring-primary'
              : 'border-border'
          }`}
        >
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold tracking-tight">
                {tier.price}
              </span>
              {tier.period && (
                <span className="ml-1 text-muted-foreground">
                  {tier.period}
                </span>
              )}
            </div>
            <p className="mt-4 text-muted-foreground">{tier.description}</p>

            <ul className="mt-8 space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            asChild
            size="lg"
            variant={tier.featured ? 'default' : 'outline'}
            className="mt-8"
          >
            <Link href={tier.href}>{tier.cta}</Link>
          </Button>
        </Card>
      ))}
    </div>

    <div className="mx-auto mt-16 max-w-2xl text-center">
      <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
      <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-lg font-semibold">
            What&apos;s included in the free plan?
          </dt>
          <dd className="mt-2 text-muted-foreground">
            The Community plan includes all core features needed to build and
            deploy modern web applications. Perfect for personal projects and
            learning.
          </dd>
        </div>
        <div>
          <dt className="text-lg font-semibold">
            Can I upgrade or downgrade anytime?
          </dt>
          <dd className="mt-2 text-muted-foreground">
            Yes, you can change your plan at any time. When upgrading,
            you&apos;ll be prorated for the remainder of the billing period.
          </dd>
        </div>
        <div>
          <dt className="text-lg font-semibold">
            What payment methods do you accept?
          </dt>
          <dd className="mt-2 text-muted-foreground">
            We accept all major credit cards and process payments through
            Stripe. Enterprise customers can also pay by invoice.
          </dd>
        </div>
        <div>
          <dt className="text-lg font-semibold">
            Do you offer educational discounts?
          </dt>
          <dd className="mt-2 text-muted-foreground">
            Yes! Students and educators can get 50% off any paid plan. Contact
            us with your academic credentials to apply.
          </dd>
        </div>
      </dl>
    </div>
  </div>
);

export default PricingPage;
