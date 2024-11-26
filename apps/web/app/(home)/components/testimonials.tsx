'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import { Card } from '@repo/design-system/components/ui/card';

const testimonials = [
  {
    content:
      'ShipKit has saved us months of development time. The features are well thought out and the documentation is excellent.',
    author: {
      name: 'Sarah Chen',
      role: 'CTO at TechStart',
      image: '/testimonials/sarah.jpg',
    },
  },
  {
    content:
      "Finally, a Next.js boilerplate that's actually production-ready. The authentication and database integration is seamless.",
    author: {
      name: 'Michael Torres',
      role: 'Lead Developer at DevCorp',
      image: '/testimonials/michael.jpg',
    },
  },
  {
    content:
      'The real-time collaboration features are a game-changer. We were able to build our entire MVP in just two weeks.',
    author: {
      name: 'Emily Rodriguez',
      role: 'Founder at CollabTech',
      image: '/testimonials/emily.jpg',
    },
  },
];

export const Testimonials = () => (
  <section id="testimonials" className="py-20 sm:py-32">
    <div className="container">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Loved by developers worldwide
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join thousands of developers building better software with ShipKit.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6">
            <p className="text-muted-foreground">"{testimonial.content}"</p>
            <div className="mt-6 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={testimonial.author.image} />
                <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimonial.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
