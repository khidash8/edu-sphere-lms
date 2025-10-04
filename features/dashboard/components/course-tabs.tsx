import { HouseIcon, PanelsTopLeftIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

export type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

interface CourseTabsProps {
  tabs?: TabItem[];
  defaultValue?: string;
}

export const CourseTabs = ({
  tabs = [
    {
      id: 'tab-1',
      label: 'Tab 1',
      icon: (
        <HouseIcon
          className="-ms-0.5 me-1.5 opacity-60"
          size={16}
          aria-hidden="true"
        />
      ),
      content: 'Content for Tab 1',
    },
    {
      id: 'tab-2',
      label: 'Tab 2',
      icon: (
        <PanelsTopLeftIcon
          className="-ms-0.5 me-1.5 opacity-60"
          size={16}
          aria-hidden="true"
        />
      ),
      content: 'Content for Tab 2',
    },
  ],
  defaultValue = 'tab-1',
}: CourseTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <ScrollArea>
        <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <div>{tab.content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
