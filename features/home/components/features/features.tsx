import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import image from '@/assets/growth.png';
import image3 from '@/assets/reflecting.png';
import image4 from '@/assets/looking-ahead.png';
import Image from 'next/image';

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: 'Personalized Learning Paths',
    description:
      'AI-powered recommendations create customized learning journeys based on your goals, skill level, and learning pace for maximum effectiveness.',
    image: image4.src,
  },
  {
    title: 'Interactive Learning Experience',
    description:
      'Engage with immersive content including videos, quizzes, simulations, and hands-on projects that make learning enjoyable and effective.',
    image: image3.src,
  },
  {
    title: 'Progress Analytics & Insights',
    description:
      'Track your learning progress with detailed analytics, performance metrics, and insights to optimize your study time and achieve better results.',
    image: image.src,
  },
];

const featureList: string[] = [
  'Mobile Learning',
  'Live Sessions',
  'Certificates',
  'Progress Tracking',
  'Discussion Forums',
  'Expert Instructors',
  'Offline Access',
  'Peer Learning',
  'Assessments',
  'Career Support',
  'Multi-language',
  'Study Groups',
];

export const Features = () => {
  return (
    <section id="features" className="container space-y-8 py-12">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{' '}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
                width={300}
                height={300}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
