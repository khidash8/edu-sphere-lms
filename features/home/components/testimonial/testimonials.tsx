import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: 'https://i.pravatar.cc/150?img=32',
    name: 'Sarah Mitchell',
    userName: 'Computer Science Student',
    comment:
      'This platform completely transformed my coding skills! The interactive lessons and real-world projects helped me land my dream internship.',
  },
  {
    image: 'https://i.pravatar.cc/150?img=12',
    name: 'Marcus Rodriguez',
    userName: 'Data Analyst',
    comment:
      'The machine learning courses are exceptional. The instructors explain complex concepts clearly, and the hands-on exercises really solidify the learning.',
  },

  {
    image: 'https://i.pravatar.cc/150?img=45',
    name: 'Jennifer Chen',
    userName: 'UX Designer',
    comment:
      'I switched careers from marketing to UX design thanks to this platform. The structured learning path and mentorship program made the transition smooth and successful.',
  },
  {
    image: 'https://i.pravatar.cc/150?img=68',
    name: 'David Thompson',
    userName: 'Software Engineer',
    comment:
      "The quality of content is outstanding. I've taken courses on React, Node.js, and cloud computing. Each course is well-structured with practical assignments that mirror real work scenarios.",
  },
  {
    image: 'https://i.pravatar.cc/150?img=25',
    name: 'Emily Johnson',
    userName: 'Product Manager',
    comment:
      'Learning while working full-time seemed impossible until I found this platform. The flexible schedule and mobile app made it easy to study during commutes.',
  },
  {
    image: 'https://i.pravatar.cc/150?img=51',
    name: 'Ahmed Hassan',
    userName: 'Cybersecurity Specialist',
    comment:
      'The cybersecurity track is comprehensive and up-to-date with industry standards. The certification I earned here helped me get promoted and increase my salary by 40%.',
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-12">
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {' '}
          Students Love{' '}
        </span>
        Learning With Us
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Join thousands of students who have transformed their careers and
        achieved their goals through our comprehensive learning platform.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt="" src={image} />
                  <AvatarFallback>
                    {name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
