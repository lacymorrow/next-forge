import { Card } from '@repo/design-system/components/ui/card';
import { BarChart, Clock, Database, Flag, Mail, Shield } from 'lucide-react';

const features = [
  {
    name: 'Authentication',
    description:
      'Production-ready auth with Clerk. User management, organizations, and more.',
    icon: Shield,
  },
  {
    name: 'Database',
    description:
      'Type-safe database with Prisma. Automatic migrations, type generation, and more.',
    icon: Database,
  },
  {
    name: 'Email System',
    description:
      'Beautiful emails with React Email and Resend. Templates, tracking, and more.',
    icon: Mail,
  },
  {
    name: 'Analytics',
    description:
      'Powerful analytics with PostHog. Event tracking, funnels, and more.',
    icon: BarChart,
  },
  {
    name: 'Feature Flags',
    description:
      'Control feature rollouts with built-in feature flags. A/B testing and more.',
    icon: Flag,
  },
  {
    name: 'Background Jobs',
    description:
      'Reliable background jobs with built-in cron support. Scheduling, retries, and more.',
    icon: Clock,
  },
];

export const Features = () => (
  <section id="features" className="py-20 sm:py-32">
    <div className="container">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Everything you need to build modern web apps
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          ShipKit comes with all the features you need to build production-ready
          applications. No more wasting time on boilerplate code.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.name} className="p-6">
            <feature.icon className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-lg font-medium">{feature.name}</h3>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
