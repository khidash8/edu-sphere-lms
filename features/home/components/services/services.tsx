import cubeLeg from '@/assets/cube-leg.png';
import Image from 'next/image';
import React from 'react';
import { ChartIcon, MagnifierIcon, WalletIcon } from '@/components/icons';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const serviceList: ServiceProps[] = [
  {
    title: 'Learning Analytics',
    description:
      'Track your progress with detailed analytics and insights. Monitor completion rates, skill development, and identify areas for improvement.',
    icon: <ChartIcon />,
  },
  {
    title: 'Course Management',
    description:
      'Organize your learning journey with structured course paths, deadlines, and milestone tracking to stay on top of your educational goals.',
    icon: <WalletIcon />,
  },
  {
    title: 'Smart Discovery',
    description:
      'Find the perfect courses with AI-powered recommendations based on your interests, career goals, and learning history.',
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Student-Centric{' '}
            </span>
            Services
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Comprehensive learning support designed to help you succeed in your
            educational journey and achieve your career aspirations.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src={cubeLeg.src}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-cover rounded-lg"
          alt="Students collaborating and learning together"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};
