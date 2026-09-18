import { formatDate } from "../utils";

type RowData = {
  roundId: String;
  playerId: String;
  gameName: String;
  betAmount: number;
  winAmount: number;
  status: string;
  startedAt: string;
  currency?: string;
};

// Allows us to eventually dynamically show more/less data easily (will still need to change header though...)
const displayKeys = [
  "roundId",
  "playerId",
  "gameName",
  "betAmount",
  "winAmount",
  "status",
  "startedAt",
];


const TableRow = ({ data }: { data: RowData }) => {
  return (
    <div className="flex flex-row w-fit border-b-b border-b-2">
      {Object.keys(data)
        .filter((k) => displayKeys.includes(k))
        .map((key: string, i) => {
          return (
            <div
              className="flex w-[180px] p-1 border-l-2  border-black"
              key={i}
            >
              {key === "startedAt" ? formatDate(data[key]) : data[key]}
            </div>
          );
        })}
    </div>
  );
};

export default TableRow;
