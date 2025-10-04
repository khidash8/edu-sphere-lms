import React from 'react';
import { getSingleCourseAction } from '@/features/courses/actions/get-single-course-action';
import Image from 'next/image';
import { constructUrl } from '@/lib/construct-url';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  IconChairDirector,
  IconChartArcs,
  IconClock,
} from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import RenderDescription from '@/components/rich-text-editor/render-description';
import { CourseContentList } from '@/features/courses/components/course-content-list';
import { CoursePurchaseCard } from '@/features/courses/components/course-purchase-card';
import { userOwnedCourseAction } from '@/features/user/actions/user-owned-course-action';

type SingleCoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CourseDetailPage = async ({ params }: SingleCoursePageProps) => {
  const { slug } = await params;

  const course = await getSingleCourseAction(slug);
  const thumbnailUrl = constructUrl(course.fileKey);
  const isEnrolled = await userOwnedCourseAction(course.id);

  return (
    <div
      className={
        'grid grid-cols-1 lg:grid-cols-3 gap-8 lg:p-8 px-6 md:px-10 lg:px-20'
      }
    >
      {/*Left side*/}
      <div
        className={
          'order-1 lg:col-span-2 space-y-4 rounded-lg overflow-hidden shadow-lg'
        }
      >
        <div className={'relative aspect-video w-full'}>
          <Image
            src={thumbnailUrl}
            alt={course.title}
            fill
            className={'object-cover'}
          />
        </div>

        <div className={'p-6 space-y-2'}>
          <Label className="text-3xl text-muted-foreground font-semibold">
            {course.title}
          </Label>
          <Label className="text-muted-foreground text-md">
            {course.smallDescription}
          </Label>

          <div className={'flex items-center gap-2 flex-wrap'}>
            <Badge>
              <IconChairDirector /> {course.level}
            </Badge>

            <Badge>
              <IconChartArcs /> {course.category}
            </Badge>

            <Badge>
              <IconClock /> {course.duration} hours
            </Badge>
          </div>

          <Separator className={'my-4'} />

          {/*  Description - rich text editor*/}
          <div>
            <Label className="text-3xl text-muted-foreground font-semibold">
              What you&#39;ll learn
            </Label>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>

          <Separator className={'my-4'} />

          {/*  course List */}
          <CourseContentList chapters={course.chapters} />
        </div>
      </div>

      {/*Right side*/}
      <div className={'order-2 lg:col-span-1'}>
        <CoursePurchaseCard
          price={course.price}
          duration={course.duration}
          level={course.level}
          category={course.category}
          courseId={course.id}
          isEnrolled={isEnrolled}
          totalLessons={course.chapters.reduce(
            (total, chapter) => total + chapter.lessons.length,
            0
          )}
          // currency="₹"
          currency={'$'}
        />
      </div>
    </div>
  );
};

export default CourseDetailPage;
