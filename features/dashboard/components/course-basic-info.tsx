'use client';

import { UpsertCourseForm } from '@/features/dashboard/components/course-upsert-form';
import CardCompact from '@/components/card-compact';
import { CourseCreateSchemaType } from '@/features/dashboard/schemas/course-create-schema-type';
import { SingleCourseType } from '@/features/dashboard/actions/get-single-couse-action';
import { useCourseUpsert } from '@/features/dashboard/hooks/use-course-upsert';

type CourseBasicInfoProps = {
  data: CourseCreateSchemaType | SingleCourseType;
};

const CourseBasicInfo = ({ data }: CourseBasicInfoProps) => {
  const { isPending, handleCourseUpsert } = useCourseUpsert();

  const onSubmit = (values: CourseCreateSchemaType) => {
    // Include the ID for update operations
    const submitData = 'id' in data ? { ...values, id: data.id } : values;
    handleCourseUpsert(submitData);
  };

  return (
    <CardCompact
      className={'p-0'}
      content={
        <UpsertCourseForm
          onSubmit={onSubmit}
          isPending={isPending}
          data={data as CourseCreateSchemaType}
        />
      }
    />
  );
};

export { CourseBasicInfo };
