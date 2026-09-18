import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AGS_ORANGE = "#F58220"

type ChartData = Record<string, string | number>;

type Props = {
  data: ChartData[];
  xKey: string;
  yKey: string;
};

export function BarChart({ data, xKey, yKey }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey={yKey} fill={AGS_ORANGE}/>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}