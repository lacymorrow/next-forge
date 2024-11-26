'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Card } from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@repo/design-system/components/ui/resizable';
import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { Switch } from '@repo/design-system/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/design-system/components/ui/tabs';
import { useToast } from '@repo/design-system/components/ui/use-toast';
import { cn } from '@repo/design-system/lib/utils';
import {
  Code2,
  Copy,
  ExternalLink,
  FileCode2,
  Palette,
  Settings2,
  Share2,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PropConfig {
  type: 'string' | 'boolean' | 'number';
  default?: string | boolean | number;
  description: string;
  options?: string[];
}

interface ComponentConfig {
  [key: string]: PropConfig;
}

// Component map for direct access
const ComponentMap = {
  Button,
  Input,
  // Add more components as needed
} as const;

// Example component props configuration
const componentProps: Record<string, ComponentConfig> = {
  Button: {
    variant: {
      type: 'string',
      default: 'default',
      description: 'Button variant',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      type: 'string',
      default: 'default',
      description: 'Button size',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether the button is disabled',
    },
  },
  Input: {
    type: {
      type: 'string',
      default: 'text',
      description: 'Input type',
      options: ['text', 'password', 'email', 'number'],
    },
    placeholder: {
      type: 'string',
      default: 'Enter text...',
      description: 'Placeholder text',
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Whether the input is disabled',
    },
  },
};

type ComponentValue = string | number | boolean;
type Props = Record<string, ComponentValue>;

type Theme = 'light' | 'dark';
type ViewMode = 'preview' | 'code' | 'split';

interface ShareConfig {
  component: string;
  props: Props;
  customCSS?: string;
  theme: Theme;
  viewMode: ViewMode;
  code: string;
}

const createCodeSandboxFiles = (config: ShareConfig) => {
  const files = {
    'package.json': {
      content: {
        name: 'shipkit-playground-example',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0',
          '@repo/design-system': 'latest',
          tailwindcss: '^3.0.0',
        },
      },
    },
    'index.tsx': {
      content: `import React from 'react';
import { ${config.component} } from '@repo/design-system/components/ui/${config.component.toLowerCase()}';

export default function Example() {
  return (
    <div className="p-4">
      ${config.code}
    </div>
  );
}`,
    },
    'styles.css': {
      content: `
@tailwind base;
@tailwind components;
@tailwind utilities;

${
  config.customCSS
    ? `
/* Custom styles */
.custom-component {
  ${config.customCSS}
}`
    : ''
}`,
    },
  };

  return files;
};

const createShareUrl = (config: ShareConfig): string => {
  const params = new URLSearchParams();

  // Add all state parameters dynamically
  Object.entries(config).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      if (typeof value === 'object') {
        params.set(key, JSON.stringify(value));
      } else {
        params.set(key, String(value));
      }
    }
  });

  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : '';
  return `${baseUrl}?${params.toString()}`;
};

const parseShareConfig = (
  searchParams: URLSearchParams
): Partial<ShareConfig> => {
  const config: Partial<ShareConfig> = {};

  // Parse all parameters dynamically
  for (const [key, value] of searchParams.entries()) {
    try {
      // Try to parse as JSON first
      config[key as keyof ShareConfig] = JSON.parse(value);
    } catch {
      // If not JSON, use the string value
      config[key as keyof ShareConfig] = value;
    }
  }

  return config;
};

export const PlaygroundView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const shareConfig = parseShareConfig(searchParams);

  const [currentComponent, setCurrentComponent] = useState(
    shareConfig.component || 'Button'
  );
  const [props, setProps] = useState<Props>(shareConfig.props || {});
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState<Theme>(shareConfig.theme || 'light');
  const [viewMode, setViewMode] = useState<ViewMode>(
    shareConfig.viewMode || 'preview'
  );
  const [customCss, setCustomCss] = useState(shareConfig.customCSS || '');

  useEffect(() => {
    // Reset props when component changes
    const defaultProps = Object.entries(
      componentProps[currentComponent] || {}
    ).reduce<Props>((acc, [key, value]) => {
      acc[key] = value.default ?? '';
      return acc;
    }, {});
    setProps(defaultProps);

    // Generate initial code
    generateCode(defaultProps);
  }, [currentComponent]);

  const generateCode = (currentProps: Props) => {
    const propsString = Object.entries(currentProps)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        return `${key}={${value}}`;
      })
      .join(' ');

    const hasChildren = currentComponent === 'Button';
    const children = hasChildren ? 'Click me' : '';

    const componentCode = `<${currentComponent} ${propsString}>${
      children ? `\n  ${children}\n` : ''
    }${hasChildren ? `</${currentComponent}>` : ' />'}`;

    const fullCode = customCss
      ? `{/* Component */}\n${componentCode}\n\n{/* Custom CSS */}\n<style jsx>{
  ${customCss}
}</style>`
      : componentCode;

    setCode(fullCode);
  };

  const handlePropChange = (prop: string, value: ComponentValue) => {
    const newProps = { ...props, [prop]: value };
    setProps(newProps);
    generateCode(newProps);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const shareComponent = async () => {
    try {
      const config = {
        component: currentComponent,
        props,
        customCSS: customCss,
        theme,
        viewMode,
        code,
      };

      const shareUrl = createShareUrl(config);
      await navigator.clipboard.writeText(shareUrl);
      router.push(shareUrl, { scroll: false });

      toast({
        title: 'Link copied!',
        description: 'Share URL has been copied to your clipboard.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to share:', error);
      toast({
        title: 'Failed to share',
        description: 'Could not copy the share URL to clipboard.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  const exportToCodeSandbox = async () => {
    try {
      const config = {
        component: currentComponent,
        props,
        customCSS: customCss,
        theme,
        viewMode,
        code,
      };

      const parameters = {
        files: createCodeSandboxFiles(config),
      };

      const formData = new FormData();
      formData.append('parameters', JSON.stringify(parameters));

      const response = await fetch(
        'https://codesandbox.io/api/v1/sandboxes/define',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.open(`https://codesandbox.io/s/${data.sandbox_id}`, '_blank');
      }

      toast({
        title: 'Exported to CodeSandbox',
        description: 'Your component has been exported to CodeSandbox.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to export:', error);
      toast({
        title: 'Export failed',
        description: 'Could not export to CodeSandbox. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  // Render the current component with its props
  const renderComponent = () => {
    const Component =
      ComponentMap[currentComponent as keyof typeof ComponentMap];
    if (!Component) return <div>Component not found: {currentComponent}</div>;

    // Safely parse custom CSS
    const customStyles = customCss
      ? JSON.parse(customCss.replace(/'/g, '"'))
      : {};

    if (currentComponent === 'Button') {
      return (
        <Component {...props} style={customStyles}>
          Click me
        </Component>
      );
    }

    return <Component {...props} style={customStyles} />;
  };

  const renderPreview = () => (
    <div className="flex-1 p-8 flex items-center justify-center bg-[url(/grid.svg)]">
      <Card className={cn('w-fit p-6', theme === 'dark' && 'bg-slate-900')}>
        {renderComponent()}
      </Card>
    </div>
  );

  const renderCode = () => (
    <div className="flex-1 p-4 bg-slate-950">
      <SyntaxHighlighter
        language="tsx"
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: '0.5rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );

  return (
    <div className="flex-1 h-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <div className="border-b">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">{currentComponent}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex border rounded-lg mr-4">
                    <Button
                      variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('preview')}
                    >
                      <Palette className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'code' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('code')}
                    >
                      <Code2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'split' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('split')}
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareComponent}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportToCodeSandbox}
                  >
                    <FileCode2 className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Docs
                  </Button>
                </div>
              </div>
            </div>
            {viewMode === 'preview' && renderPreview()}
            {viewMode === 'code' && renderCode()}
            {viewMode === 'split' && (
              <div className="flex-1 grid grid-cols-2 divide-x">
                {renderPreview()}
                {renderCode()}
              </div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <Tabs defaultValue="props">
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="props">Props</TabsTrigger>
                <TabsTrigger value="styles">Styles</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
            <ScrollArea className="h-[calc(100%-2.5rem)]">
              <TabsContent value="props" className="p-4 m-0">
                <div className="space-y-4">
                  {Object.entries(componentProps[currentComponent] || {}).map(
                    ([prop, config]) => (
                      <div key={prop} className="space-y-2">
                        <Label htmlFor={prop} className="text-sm font-medium">
                          {prop}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {config.description}
                        </p>
                        {config.type === 'boolean' ? (
                          <Switch
                            id={prop}
                            checked={!!props[prop]}
                            onCheckedChange={(checked: boolean) =>
                              handlePropChange(prop, checked)
                            }
                          />
                        ) : config.options ? (
                          <select
                            id={prop}
                            value={String(props[prop] || '')}
                            onChange={(e) =>
                              handlePropChange(prop, e.target.value)
                            }
                            className="w-full p-2 border rounded-md"
                          >
                            {config.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            id={prop}
                            value={String(props[prop] || '')}
                            onChange={(e) =>
                              handlePropChange(prop, e.target.value)
                            }
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="styles" className="p-4 m-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Theme</Label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as Theme)}
                      className="p-2 border rounded-md"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Custom CSS</Label>
                    <textarea
                      value={customCss}
                      onChange={(e) => {
                        setCustomCss(e.target.value);
                        generateCode(props);
                      }}
                      placeholder="Enter custom CSS as JSON object (e.g., { color: 'red', padding: '1rem' })"
                      className="w-full h-32 p-2 border rounded-md font-mono text-sm"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="code" className="p-4 m-0">
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                  {code}
                </pre>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
