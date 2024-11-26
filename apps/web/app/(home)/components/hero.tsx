'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { env } from '@repo/env';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => (
  <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="font-display mx-auto max-w-4xl text-4xl font-medium tracking-tight sm:text-7xl">
          Ship{' '}
          <span className="relative whitespace-nowrap">
            <span className="relative text-primary">better software</span>
          </span>{' '}
          faster
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Your complete toolkit for modern web development. Start building
          production-ready applications with Next.js, TypeScript, and
          industry-leading practices.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
          <Button asChild size="lg" className="gap-2">
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="https://github.com/your-repo/shipkit">
              <Github className="h-4 w-4" />
              Star on GitHub
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
