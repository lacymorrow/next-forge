'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { cn } from '@repo/design-system/lib/utils';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';

// Component categories with their respective components
const categories = [
  {
    name: 'Forms',
    components: ['Button', 'Input'],
  },
] as const;

export const PlaygroundNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentComponent = searchParams.get('component') || 'Button';

  // Filter components based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      components: category.components.filter((component) =>
        component.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.components.length > 0);

  const handleComponentClick = (component: string) => {
    router.push(`/playground?component=${component}`);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value || '');
  };

  return (
    <div className="w-64 border-r h-full bg-background">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {category.name}
              </h3>
              <div className="space-y-1">
                {category.components.map((component) => (
                  <Button
                    key={component}
                    variant="ghost"
                    className={cn(
                      'w-full justify-start text-sm',
                      currentComponent === component && 'bg-accent'
                    )}
                    onClick={() => handleComponentClick(component)}
                  >
                    {component}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
