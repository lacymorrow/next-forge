import type { Metadata } from 'next';
import { Features } from './components/features';
import { Hero } from './components/hero';
import { Testimonials } from './components/testimonials';

export const metadata: Metadata = {
  title: 'ShipKit - Ship Better Software Faster',
  description:
    'ShipKit is your all-in-one toolkit for building, deploying, and managing modern web applications. Built with Next.js, TypeScript, and best practices in mind.',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
    </main>
  );
}
