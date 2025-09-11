'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LineChartProps {
  data: any[];
  title?: string;
  description?: string;
  lines: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  xAxisDataKey: string;
  height?: number;
  className?: string;
}

export function LineChart({
  data,
  title,
  description,
  lines,
  xAxisDataKey,
  height = 300,
  className,
}: LineChartProps) {
  const formatTooltipValue = (value: any, name: string) => {
    if (
      name.toLowerCase().includes('revenue') ||
      name.toLowerCase().includes('ingreso')
    ) {
      return [`$${(value / 100).toFixed(2)}`, name];
    }
    return [value.toLocaleString(), name];
  };

  const content = (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey={xAxisDataKey}
          className="text-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          className="text-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={formatTooltipValue}
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            fontSize: '12px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        {lines.length > 1 && <Legend />}
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
            name={line.name}
            activeDot={{ r: 6, fill: line.color }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );

  if (title) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return <div className={className}>{content}</div>;
}
