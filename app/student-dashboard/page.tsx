import { getEnrolledCoursesAction } from '@/features/student-dashboard/actions/get-enrolled-courses-action';
import { getAllPublicCoursesAction } from '@/features/courses/actions/getAllPublic-courses-action';
import { Label } from '@/components/ui/label';
import { Placeholder } from '@/components/place-holder';
import { StudentCourseCard } from '@/features/student-dashboard/components/student-course-card';
import { Separator } from '@/components/ui/separator';
import { studentDashboardPath } from '@/features/constants/path-constants';

export default async function StudentDashboardPage() {
  const [enrolledCourses, publicCourses] = await Promise.all([
    getEnrolledCoursesAction(),
    getAllPublicCoursesAction(),
  ]);

  // Get IDs of enrolled courses to filter them out from public courses
  const enrolledCourseIds = new Set(
    enrolledCourses.map((enrollment) => enrollment.Course.id)
  );

  // Filter out enrolled courses from public courses
  const availableCourses = publicCourses.filter(
    (course) => !enrolledCourseIds.has(course.id)
  );

  return (
    <>
      <div className="space-y-12">
        {/* Enrolled Courses Section */}
        <section>
          <div className="mb-6">
            <Label className="text-2xl font-semibold text-muted-foreground">
              Enrolled Courses
            </Label>
            <Label className="text-muted-foreground text-md block mt-2">
              Continue your learning journey with your enrolled courses
            </Label>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map((enrollment) => (
                <StudentCourseCard
                  key={enrollment.Course.id}
                  course={enrollment.Course}
                  isEnrolled={true}
                  courseUrl={`${studentDashboardPath()}/${enrollment.Course.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center py-12">
              <Placeholder message="No Enrolled Courses Found" />
            </div>
          )}
        </section>

        <Separator />

        {/* Available Courses Section */}
        <section>
          <div className="mb-6">
            <Label className="text-2xl font-semibold text-muted-foreground">
              Explore More Courses
            </Label>
            <Label className="text-muted-foreground text-md block mt-2">
              Discover our wide range of courses designed to help you achieve
              your goals
            </Label>
          </div>

          {availableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCourses.map((course) => (
                <StudentCourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center py-12">
              <Placeholder message="You have no available courses" />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
