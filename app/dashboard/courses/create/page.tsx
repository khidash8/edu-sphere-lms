'use client';

import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { dashboardCoursesPath } from '@/features/constants/path-constants';
import { LucideArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import CardCompact from '@/components/card-compact';
import { CourseCreateSchemaType } from '@/features/dashboard/schemas/course-create-schema-type';
import { UpsertCourseForm } from '@/features/dashboard/components/course-upsert-form';
import { useCourseUpsert } from '@/features/dashboard/hooks/use-course-upsert';
import { useConfetti } from '@/hooks/use-confetti';

const CreateCoursePage = () => {
  const { triggerConfetti } = useConfetti();

  const { isPending, handleCourseUpsert } = useCourseUpsert({
    onSuccess: () => {
      triggerConfetti();
    },
  });

  const onSubmit = (values: CourseCreateSchemaType) => {
    handleCourseUpsert(values); // No ID means it's a create operation
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href={dashboardCoursesPath()}
          className={buttonVariants({
            variant: 'outline',
          })}
        >
          <LucideArrowLeft />
        </Link>
        <Label className="text-3xl font-semibold">Create Course</Label>
      </div>

      <CardCompact
        content={<UpsertCourseForm onSubmit={onSubmit} isPending={isPending} />}
      />
    </div>
  );
};

export default CreateCoursePage;
