import { Skeleton } from '@/components/ui/skeleton';
import CardCompact from '@/components/card-compact';

type CourseCardSkeletonProps = {
  className?: string;
  showEditButton?: boolean;
};

export const CourseCardSkeleton = ({
  className,
  showEditButton = false,
}: CourseCardSkeletonProps) => {
  const content = (
    <>
      <div className="relative">
        {/* Image Skeleton */}
        <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
          <Skeleton className="h-full w-full " />
        </div>

        {/* Dropdown Menu Button Skeleton */}
        <div className="absolute top-2 right-2">
          <Skeleton className=" h-8 w-8 rounded" />
        </div>
      </div>

      <div className="space-y-2 w-full">
        {/* Course Details */}
        <div className="space-y-3 p-4">
          <div>
            {/* Title Skeleton */}
            <Skeleton className=" h-6 w-3/4 mb-2" />

            {/* Description Skeleton */}
            <Skeleton className=" h-4 w-full mb-1" />
            <Skeleton className=" h-4 w-2/3" />
          </div>

          {/* Hours and Price */}
          <div className="flex items-center justify-between">
            {/* Duration Skeleton */}
            <div className="flex items-center gap-1">
              <Skeleton className=" h-4 w-4 rounded" />
              <Skeleton className=" h-4 w-16" />
            </div>

            {/* Price Skeleton */}
            <Skeleton className=" h-4 w-12" />
          </div>
        </div>
      </div>
    </>
  );

  const footer = showEditButton ? (
    <Skeleton className=" h-9 w-full mx-2 mb-2 rounded" />
  ) : null;

  return (
    <CardCompact
      className={`w-full shadow-none border-none  transition-shadow ${className || ''} p-0 rounded-lg pb-2 flex flex-col gap-2 justify-between`}
      contentClassName="p-0"
      content={content}
      footer={footer}
    />
  );
};
