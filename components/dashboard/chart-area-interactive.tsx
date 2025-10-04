'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ChartProps = {
  chartData: { date: string; enrollments: number }[];
};

const chartConfig = {
  enrollments: {
    label: 'Enrollments',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ chartData }: ChartProps) {
  const isMobile = useIsMobile();

  // Calculate total enrollments
  const totalEnrollments = React.useMemo(
    () => chartData.reduce((sum, item) => sum + item.enrollments, 0),
    [chartData]
  );

  // Optimize data display for mobile - show fewer data points
  const optimizedData = React.useMemo(() => {
    if (!isMobile) return chartData;

    // For mobile, show every 3rd data point to reduce congestion
    return chartData.filter(
      (_, index) => index % 3 === 0 || index === chartData.length - 1
    );
  }, [chartData, isMobile]);

  // Optimize X-axis formatting for mobile
  const formatXAxisTick = React.useCallback(
    (value: string) => {
      const date = new Date(value);
      if (isMobile) {
        // Show only day number on mobile
        return date.getDate().toString();
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    },
    [isMobile]
  );

  // Optimize tooltip formatting
  const formatTooltipLabel = React.useCallback((value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  return (
    <Card className="@container/card">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Total Enrollments</CardTitle>
        <CardDescription>
          <span className="text-muted-foreground hidden @[540px]/card:block">
            Total enrollments for the last 30 days: {totalEnrollments}
          </span>
          <span className="text-muted-foreground @[540px]/card:hidden">
            Last 30 days: {totalEnrollments}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 sm:px-6 pb-4 sm:pb-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] sm:h-[300px] w-full"
        >
          <BarChart
            margin={{
              left: isMobile ? 8 : 12,
              right: isMobile ? 8 : 12,
              top: 8,
              bottom: isMobile ? 20 : 12,
            }}
            data={optimizedData}
            barSize={isMobile ? 12 : 20}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={isMobile ? 8 : 12}
              interval={isMobile ? 0 : 'preserveStartEnd'}
              tickFormatter={formatXAxisTick}
              fontSize={isMobile ? 12 : 14}
              minTickGap={isMobile ? 1 : 5}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={isMobile ? 8 : 12}
              fontSize={isMobile ? 12 : 14}
              width={isMobile ? 30 : 40}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className={isMobile ? 'w-[160px]' : 'w-[200px]'}
                  labelFormatter={formatTooltipLabel}
                />
              }
            />
            <Bar
              dataKey="enrollments"
              fill="var(--color-enrollments)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        {/* Mobile-friendly time range selector */}
        {isMobile && (
          <div className="flex justify-center mt-4">
            <div className="bg-muted/50 rounded-lg p-1 text-xs">
              <span className="text-muted-foreground">
                Showing sampled data for better visibility
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
