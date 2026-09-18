import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type ChartData = Record<string, string | number>;

type Props = {
  data: ChartData[];
  nameKey: string;
  valueKey: string;
  colors?: string[];
};

export function PieChart({
  data,
  nameKey,
  valueKey,
  colors = ["#F58220"],
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}