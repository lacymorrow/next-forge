export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b flex items-center px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold">Component Playground</h1>
          <nav className="flex items-center space-x-4 text-sm">
            <a
              href="/docs/components"
              className="text-muted-foreground hover:text-foreground"
            >
              Documentation
            </a>
            <a
              href="/docs/examples"
              className="text-muted-foreground hover:text-foreground"
            >
              Examples
            </a>
            <a
              href="/docs/templates"
              className="text-muted-foreground hover:text-foreground"
            >
              Templates
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex">{children}</main>
    </div>
  );
}
