import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { GraduationCap, Linkedin, Star, Users, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export const HeroCards = () => {
  return (
    <div className="flex flex-row flex-wrap gap-8 relative">
      {/* Pinterest-style masonry grid */}
      <div className="columns-2 gap-4 space-y-4 relative z-10 w-full">
        {/* Student Review/Testimonial */}
        <Card className="break-inside-avoid mb-4 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              <AvatarImage alt="" src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <CardTitle className="text-lg">Sarah Mitchell</CardTitle>
              <CardDescription>Computer Science Student</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-sm">
              &#34;This platform transformed my learning experience! The courses
              are well-structured and the instructors are amazing.&#34;
            </p>
          </CardContent>
        </Card>

        {/* Learning Statistics */}
        <Card className="break-inside-avoid mb-4 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Learning Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1.2K+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructor Profile */}
        <Card className="break-inside-avoid mb-4 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader className="text-center pb-2 relative">
            <Image
              src="https://i.pravatar.cc/150?img=12"
              alt="instructor avatar"
              className="mx-auto rounded-full w-16 h-16 object-cover mb-2"
              width={64}
              height={64}
            />
            <CardTitle className="text-lg">Dr. Emily Rodriguez</CardTitle>
            <CardDescription className="text-primary font-medium">
              Machine Learning Expert
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center pb-2 space-y-2">
            <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>12.5k</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
              </div>
            </div>
            <p className="text-sm">
              &#34;Making AI accessible to everyone through practical
              learning&#34;
            </p>
          </CardContent>

          <CardFooter className="justify-center">
            <div className="flex space-x-2">
              <Link
                href="#"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                <GraduationCap className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Learning Progress */}
        <Card className="break-inside-avoid mb-4 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Your Progress
            </CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>JavaScript Fundamentals</span>
                  <span className="text-primary font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>React Development</span>
                  <span className="text-primary font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Node.js Backend</span>
                  <span className="text-primary font-medium">34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
