import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import {
  ArrowRight,
  Code2,
  Database,
  Lock,
  Mail,
  Rocket,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Features - ShipKit',
  description:
    'Everything you need to build modern web applications. Authentication, database, emails, and more.',
};

const features = [
  {
    id: 'auth',
    name: 'Authentication',
    description: 'Production-ready authentication and user management.',
    icon: Lock,
    content: {
      overview:
        'Complete authentication system powered by Clerk. User management, organizations, and more.',
      features: [
        'Social login (Google, GitHub, etc.)',
        'Email/password authentication',
        'Two-factor authentication',
        'Organization management',
        'Role-based access control',
        'User profiles and settings',
      ],
      code: `// Add authentication to any page
export default function Page() {
  const { user } = auth();
  
  if (!user) {
    return <SignIn />;
  }

  return <Dashboard />;
}`,
    },
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Type-safe database with automatic migrations.',
    icon: Database,
    content: {
      overview:
        'Fully type-safe database powered by Prisma. Automatic migrations, type generation, and more.',
      features: [
        'Type-safe queries and mutations',
        'Automatic migrations',
        'Database schema management',
        'Multiple database support',
        'Connection pooling',
        'Query optimization',
      ],
      code: `// Type-safe database queries
const user = await db.user.findUnique({
  where: { id },
  include: { posts: true }
});

// Automatic type inference
const posts = user.posts; // Post[]`,
    },
  },
  {
    id: 'email',
    name: 'Email System',
    description: 'Beautiful, responsive emails with React.',
    icon: Mail,
    content: {
      overview:
        'Complete email system powered by React Email and Resend. Beautiful templates, tracking, and more.',
      features: [
        'React-based email templates',
        'Responsive design',
        'Email tracking and analytics',
        'Template management',
        'Transactional emails',
        'Marketing campaigns',
      ],
      code: `// Send beautiful emails with React
await resend.emails.send({
  from: 'hello@example.com',
  to: user.email,
  subject: 'Welcome!',
  react: <WelcomeEmail user={user} />
});`,
    },
  },
  {
    id: 'development',
    name: 'Developer Experience',
    description: 'Best-in-class development experience.',
    icon: Code2,
    content: {
      overview:
        'Modern development tools and practices for the best possible developer experience.',
      features: [
        'TypeScript support',
        'ESLint + Prettier',
        'Hot module reloading',
        'Development tools',
        'Testing setup',
        'CI/CD configuration',
      ],
      code: `// Type-safe environment variables
const config = {
  apiKey: env.API_KEY,
  url: env.DATABASE_URL,
};

// TypeScript will catch errors
config.missing; // Error!`,
    },
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Built for speed and optimization.',
    icon: Zap,
    content: {
      overview:
        'Performance optimizations built-in. Fast page loads, optimized assets, and more.',
      features: [
        'Server components',
        'Automatic image optimization',
        'Bundle size optimization',
        'Edge functions support',
        'Caching strategies',
        'Performance monitoring',
      ],
      code: `// Optimized images out of the box
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  placeholder="blur"
/>`,
    },
  },
  {
    id: 'deployment',
    name: 'Deployment',
    description: 'Deploy with confidence.',
    icon: Rocket,
    content: {
      overview:
        'Production-ready deployment configuration. CI/CD, monitoring, and more.',
      features: [
        'One-click deployment',
        'Environment management',
        'Automatic SSL',
        'Edge functions',
        'Analytics integration',
        'Error monitoring',
      ],
      code: `// Automatic environment validation
const config = {
  url: env.DATABASE_URL,
  key: env.API_KEY,
};

// Missing env vars = build fails`,
    },
  },
];

const FeaturePage = () => (
  <div className="container py-20 sm:py-32">
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Everything you need to build modern apps
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        ShipKit comes with all the features you need to build production-ready
        applications. No more wasting time on boilerplate.
      </p>
    </div>

    <div className="mx-auto mt-16 grid max-w-5xl gap-8">
      {features.map((feature) => (
        <div key={feature.id} className="group relative">
          <Tabs defaultValue="overview" className="relative">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
              <TabsList className="self-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-8">
              <TabsContent value="overview">
                <Card className="p-6">
                  <p className="text-muted-foreground">
                    {feature.content.overview}
                  </p>
                </Card>
              </TabsContent>
              <TabsContent value="features">
                <Card className="p-6">
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {feature.content.features.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value="code">
                <Card className="overflow-hidden">
                  <pre className="overflow-x-auto bg-muted p-6 text-sm">
                    <code>{feature.content.code}</code>
                  </pre>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      ))}
    </div>

    <div className="mx-auto mt-16 max-w-2xl text-center">
      <h2 className="text-2xl font-semibold">Ready to get started?</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Join thousands of developers building better software with ShipKit.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/sign-up">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/docs">View Docs</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default FeaturePage;
