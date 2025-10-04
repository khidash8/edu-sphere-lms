import React from 'react';
import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: 'Choose Your Path',
    description:
      'Browse our extensive catalog of courses and select the learning path that aligns with your goals and interests.',
  },
  {
    icon: <MapIcon />,
    title: 'Learn & Progress',
    description:
      'Follow structured lessons, complete assignments, and track your progress with our intuitive learning dashboard.',
  },
  {
    icon: <PlaneIcon />,
    title: 'Practice & Apply',
    description:
      'Put your knowledge to test with hands-on projects, quizzes, and real-world scenarios to master your skills.',
  },
  {
    icon: <GiftIcon />,
    title: 'Earn & Achieve',
    description:
      'Get certified upon completion, earn badges for achievements, and showcase your new skills to advance your career.',
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-12">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How{' '}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Learning{' '}
        </span>
        Works
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Start your learning journey in just four simple steps. From course
        selection to certification, we&#39;ll guide you every step of the way.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps, index) => (
          <Card key={title} className="bg-muted/50 relative">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                <div className="relative">
                  {icon}
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
