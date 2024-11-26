import type { Metadata } from 'next';
import { PlaygroundNav } from './components/playground-nav';
import { PlaygroundView } from './components/playground-view';

export const metadata: Metadata = {
  title: 'Component Playground - ShipKit',
  description:
    'Interactive playground for exploring and customizing ShipKit components.',
};

export default function PlaygroundPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <PlaygroundNav />
      <PlaygroundView />
    </div>
  );
}
