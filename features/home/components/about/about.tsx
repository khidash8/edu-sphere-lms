import Image from 'next/image';
import { Statistics } from '@/features/home/components/about/statistics';
import pilot from '@/assets/pilot.png';

export const About = () => {
  return (
    <section id="about" className="container pb-12">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={pilot.src}
            alt="Students learning together in modern classroom"
            className="w-[300px] object-cover rounded-lg"
            width={300}
            height={400}
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                  About{' '}
                </span>
                <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                  EduSphere
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                We&#39;re revolutionizing education through technology and
                innovation. Our comprehensive learning management system
                empowers students, educators, and institutions to achieve their
                full potential. With cutting-edge tools, personalized learning
                paths, and expert-crafted content, we&#39;re building the future
                of education today.
              </p>
              <p className="text-lg text-muted-foreground mt-3">
                Join thousands of learners who have transformed their careers
                and unlocked new opportunities through our platform.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
