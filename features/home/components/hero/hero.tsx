import { buttonVariants } from '@/components/ui/button';
import { BookOpen, Play } from 'lucide-react';
import { HeroCards } from '@/features/home/components/hero/hero-cards';
import Link from 'next/link';
import { coursesPath } from '@/features/constants/path-constants';

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 py-32 md:py-24 place-items-center gap-10 min-h-[70vh]">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              Learn
            </span>{' '}
            without limits
          </h1>{' '}
          with{' '}
          <h2 className="inline">
            <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Smart
            </span>{' '}
            education
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Unlock your potential with our comprehensive learning management
          system. Access courses, track progress, and achieve your goals.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            href={coursesPath()}
            className={`w-full md:w-1/3 ${buttonVariants({})}`}
          >
            <BookOpen className="mr-2 w-5 h-5" />
            Start Learning
          </Link>

          <Link
            rel="noreferrer noopener"
            href={coursesPath()}
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: 'outline',
            })}`}
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10 ">
        <HeroCards />
      </div>
    </section>
  );
};
