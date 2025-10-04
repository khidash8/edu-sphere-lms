import {
  IconBook,
  IconPlaylist,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDashboardStatsAction } from '@/features/dashboard/actions/get-dashboard-stats-action';

export async function SectionCards() {
  const { totalSignups, totalCustomers, totalCourses, totalLessons } =
    await getDashboardStatsAction();
  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card
    dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs
    @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
    >
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Signups</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <IconUser className="w-6 h-6 text-muted-foreground" />
            {totalSignups}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Signups for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Enrollments</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <IconShoppingCart className="w-6 h-6 text-muted-foreground" />
            {totalCustomers}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Users who have purchased courses
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Courses</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <IconBook className="w-6 h-6 text-muted-foreground" />
            {totalCourses}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total courses available</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Lessons</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <IconPlaylist className="w-6 h-6 text-muted-foreground" />
            {totalLessons}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total learning content available
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
