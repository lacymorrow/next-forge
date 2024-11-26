'use client';

import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@repo/design-system/components/ui/navigation-menu';
import { env } from '@repo/env';
import { Menu, MoveRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Logo from './logo.svg';

export const Header = () => {
  const navigationItems = [
    {
      title: 'Features',
      description: 'Everything you need to build and ship faster.',
      items: [
        {
          title: 'Authentication',
          href: '/features#authentication',
          description: 'Production-ready auth with Clerk',
        },
        {
          title: 'Database',
          href: '/features#database',
          description: 'Type-safe database with Prisma',
        },
        {
          title: 'Email',
          href: '/features#email',
          description: 'Beautiful emails with React Email',
        },
        {
          title: 'Analytics',
          href: '/features#analytics',
          description: 'Powerful analytics with PostHog',
        },
      ],
    },
    {
      title: 'Resources',
      description: 'Learn and build with ShipKit.',
      items: [
        {
          title: 'Documentation',
          href: env.NEXT_PUBLIC_DOCS_URL,
          description: 'Learn how to use ShipKit',
        },
        {
          title: 'Blog',
          href: '/blog',
          description: 'Technical articles and updates',
        },
        {
          title: 'Templates',
          href: '/templates',
          description: 'Pre-built templates to get started',
        },
      ],
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'Enterprise',
      href: '/enterprise',
    },
  ];

  const [isOpen, setOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b bg-background">
      <div className="container relative mx-auto flex min-h-20 flex-row items-center gap-4 lg:grid lg:grid-cols-3">
        <div className="hidden flex-row items-center justify-start gap-4 lg:flex">
          <NavigationMenu className="flex items-start justify-start">
            <NavigationMenuList className="flex flex-row justify-start gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" asChild>
                        <Link href={item.href}>{item.title}</Link>
                      </Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button size="sm" className="mt-10" asChild>
                              <Link href="/contact">Book a demo</Link>
                            </Button>
                          </div>
                          <div className="flex h-full flex-col justify-end text-sm">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                              >
                                <div className="flex flex-col">
                                  <span>{subItem.title}</span>
                                  <span className="text-muted-foreground text-xs">
                                    {subItem.description}
                                  </span>
                                </div>
                                <MoveRight className="h-4 w-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2 lg:justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="ShipKit Logo"
              width={24}
              height={24}
              className="dark:invert"
            />
            <p className="whitespace-nowrap font-semibold">ShipKit</p>
          </Link>
        </div>

        <div className="flex w-full justify-end gap-4">
          <Button variant="ghost" className="hidden md:inline" asChild>
            <Link href="/contact">Book a demo</Link>
          </Button>
          <div className="hidden border-r md:inline" />
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}>Get started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex w-12 shrink items-end justify-end lg:hidden">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg lg:hidden">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block text-lg font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <p className="text-lg font-medium">{item.title}</p>
                      <div className="ml-4 space-y-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block text-muted-foreground"
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
