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
import { Copy, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export const PlaygroundView = () => {
  const searchParams = useSearchParams();
  const currentComponent = searchParams.get('component') || 'Button';
  const [props, setProps] = useState<Props>({});
  const [code, setCode] = useState('');

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

    setCode(
      `<${currentComponent} ${propsString}>${
        children ? `\n  ${children}\n` : ''
      }${hasChildren ? `</${currentComponent}>` : ' />'}`
    );
  };

  const handlePropChange = (prop: string, value: ComponentValue) => {
    const newProps = { ...props, [prop]: value };
    setProps(newProps);
    generateCode(newProps);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  // Render the current component with its props
  const renderComponent = () => {
    const Component =
      ComponentMap[currentComponent as keyof typeof ComponentMap];
    if (!Component) return <div>Component not found: {currentComponent}</div>;

    if (currentComponent === 'Button') {
      return <Component {...props}>Click me</Component>;
    }

    return <Component {...props} />;
  };

  return (
    <div className="flex-1 h-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <div className="border-b">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">{currentComponent}</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Docs
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center bg-[url(/grid.svg)]">
              <Card className="w-fit p-6">{renderComponent()}</Card>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <Tabs defaultValue="props">
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="props">Props</TabsTrigger>
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
