import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: 'Basic',
    popular: 0,
    price: 0,
    description:
      'Perfect for beginners looking to explore new skills and get started with online learning.',
    buttonText: 'Get Started Free',
    benefitList: [
      'Access to 50+ free courses',
      'Basic progress tracking',
      'Community forum access',
      'Mobile app access',
      'Basic certificates',
    ],
  },
  {
    title: 'Pro',
    popular: 1,
    price: 29,
    description:
      'Ideal for serious learners who want comprehensive access to all courses and premium features.',
    buttonText: 'Start Free Trial',
    benefitList: [
      'Unlimited course access (500+)',
      'Advanced analytics & insights',
      'Priority instructor support',
      'Offline course downloads',
      'Verified certificates',
      'Career guidance sessions',
    ],
  },
  {
    title: 'Enterprise',
    popular: 0,
    price: 99,
    description:
      'Designed for teams and organizations looking to upskill their workforce at scale.',
    buttonText: 'Contact Sales',
    benefitList: [
      'Everything in Pro plan',
      'Team management dashboard',
      'Custom learning paths',
      'Advanced reporting & analytics',
      'Dedicated account manager',
      'API access & integrations',
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Choose Your
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {' '}
          Learning{' '}
        </span>
        Plan
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Start your learning journey today with flexible pricing options designed
        to fit your goals and budget.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? 'drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-primary/50'
                : ''
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full cursor-pointer"
                variant={
                  pricing.popular === PopularPlanType.YES
                    ? 'default'
                    : 'outline'
                }
              >
                {pricing.buttonText}
              </Button>
            </CardContent>

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" />{' '}
                    <h3 className="ml-2 text-sm">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
