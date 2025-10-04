import React from 'react';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { dashboardCoursesPath } from '@/features/constants/path-constants';
import { LucideArrowLeft, LucideBold, PanelsTopLeftIcon } from 'lucide-react';
import {
  CourseTabs,
  TabItem,
} from '@/features/dashboard/components/course-tabs';
import { CourseBasicInfo } from '@/features/dashboard/components/course-basic-info';
import { getSingleCourseAction } from '@/features/dashboard/actions/get-single-couse-action';
import { MainCourseStructure } from '@/features/dra-n-drop/components/main-course-structure';

type EditCoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

const EditCoursePage = async ({ params }: EditCoursePageProps) => {
  const { courseId } = await params;

  const data = await getSingleCourseAction(courseId);

  const tabs: TabItem[] = [
    {
      id: 'basic-info',
      label: 'Basic Info',
      icon: (
        <LucideBold
          className="-ms-0.5 me-1.5 opacity-60"
          size={16}
          aria-hidden="true"
        />
      ),
      content: <CourseBasicInfo data={data} />,
    },
    {
      id: 'course-content',
      label: 'Course Content',
      icon: (
        <PanelsTopLeftIcon
          className="-ms-0.5 me-1.5 opacity-60"
          size={16}
          aria-hidden="true"
        />
      ),

      // content: <CourseContentStructure data={data} />,
      content: <MainCourseStructure data={data} />,
    },
  ];

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <Label className="text-xl font-semibold">Edit Course</Label>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={dashboardCoursesPath()}
        >
          <LucideArrowLeft /> All Courses
        </Link>
      </div>

      <CourseTabs tabs={tabs} defaultValue={'basic-info'} />
    </div>
  );
};

export default EditCoursePage;
