import React from 'react';
import {
  IconClock,
  IconChartArcs,
  IconCategory,
  IconBook,
  IconCheck,
} from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EnrollSubmitButton } from '@/features/payments/components/enroll-submit-button';

type CoursePurchaseCardProps = {
  price: number;
  duration: number;
  level: string;
  category: string;
  totalLessons: number;
  currency?: string;
  courseId: string;
  isEnrolled: boolean;
};

const CoursePurchaseCard = ({
  price,
  duration,
  level,
  category,
  totalLessons,
  currency = '$',
  courseId,
  isEnrolled = false,
}: CoursePurchaseCardProps) => {
  return (
    <Card className="sticky top-4 px-6">
      <CardContent className="p-6 space-y-6">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Price:</span>
          <span className="text-3xl font-bold text-primary">
            {currency}
            {price.toFixed(2)}
          </span>
        </div>

        <Separator />

        {/* What you will get */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What you will get:</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconClock size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Course Duration</p>
                <p className="text-sm text-muted-foreground">
                  {duration} hours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconChartArcs size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Difficulty Level</p>
                <p className="text-sm text-muted-foreground">{level}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconCategory size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <IconBook size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Total Lessons</p>
                <p className="text-sm text-muted-foreground">
                  {totalLessons} Lessons
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* This course includes */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">This course includes:</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <IconCheck size={18} className="text-green-500" />
              <span>Full lifetime access</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconCheck size={18} className="text-green-500" />
              <span>Access on mobile and desktop</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconCheck size={18} className="text-green-500" />
              <span>Certificate of completion</span>
            </div>
          </div>
        </div>

        {/* Enroll Button */}
        <EnrollSubmitButton courseId={courseId} isEnrolled={isEnrolled} />

        <div className={'flex items-center justify-center'}>
          <p className="text-sm text-muted-foreground">
            30 days money back guarantee
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { CoursePurchaseCard };
