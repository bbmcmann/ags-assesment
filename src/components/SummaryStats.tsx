import type { Transaction } from "../types";
import { roundMoney } from "../utils";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";

const SummaryTableRow = ({
  item,
  value,
}: {
  item: string;
  value: string | number;
}) => {
  return (
    <div className="flex flex-row justify-between w-[300px]">
      <p className="text-orange-600 text-lg font-semibold">{item}</p>
      <p>{value}</p>
    </div>
  );
};

const SummaryStats = ({ data }: { data: Transaction[] }) => {
  const totalTransactions = data.length;
  const totalWagered = roundMoney(
    data.reduce((acc, cur) => acc + cur.betAmount, 0),
  );
  const totalWon = roundMoney(
    data.reduce((acc, cur) => acc + cur.winAmount, 0),
  );
  const totalError = data.reduce((acc, cur) => {
    if (cur.status === "ERROR") return acc + 1;
    else return acc;
  }, 0);

  //   note: sort array so ons tate change they key order doesnt change for no reason
  const statusCounts = Object.entries(
    data.reduce<Record<string, number>>((counts, transaction) => {
      counts[transaction.status] = (counts[transaction.status] ?? 0) + 1;

      return counts;
    }, {}),
  )
    .map(([status, count]) => ({
      status,
      count,
    }))
    .sort((a, b) => a.status.localeCompare(b.status));

  const gameBetting = Object.entries(
    data.reduce<Record<string, number>>((counts, transaction) => {
      counts[transaction.gameName] =
        (counts[transaction.gameName] ?? 0) + transaction.betAmount;

      return counts;
    }, {}),
  )
    .map(([game, count]) => ({
      game,
      count: roundMoney(count),
    }))
    .sort((a, b) => a.game.localeCompare(b.game));

  const gameWinning = Object.entries(
    data.reduce<Record<string, number>>((counts, transaction) => {
      counts[transaction.gameName] =
        (counts[transaction.gameName] ?? 0) + transaction.winAmount;

      return counts;
    }, {}),
  )
    .map(([game, count]) => ({
      game,
      count: roundMoney(count),
    }))
    .sort((a, b) => a.game.localeCompare(b.game));

  return (
    <div className="w-[30%] flex flex-col items-center">
      <p className="text-3xl mb-10 mt-10">Aggregate Statistics</p>
      <SummaryTableRow item="Transactions" value={totalTransactions} />
      <SummaryTableRow item="Total Wagered" value={totalWagered} />
      <SummaryTableRow item="Total Winnings" value={totalWon} />
      <SummaryTableRow item="Total Errors" value={totalError} />


      <p className="text-2xl text-orange-600 mb-3 mt-10">Status Distribution</p>
      <BarChart data={statusCounts} xKey="status" yKey="count" />

      <p className="text-2xl text-orange-600 mb-3 mt-10">Total Bets by Game</p>

      <PieChart
        data={gameBetting}
        nameKey="game"
        valueKey="count"
        colors={[
          "#5B8DEF",
          "#58A6A6",
          "#6FAF78",
          "#D1A24C",
          "#8B78B8",
          "#C76D7A",
          "#4F9BB3",
          "#B9854D",
          "#687DA6",
          "#858585",
        ]}
      />

      <p className="text-2xl text-orange-600 mb-3 mt-10">Total Wins by Game</p>

      <PieChart
        data={gameWinning}
        nameKey="game"
        valueKey="count"
        colors={[
          "#5B8DEF",
          "#58A6A6",
          "#6FAF78",
          "#D1A24C",
          "#8B78B8",
          "#C76D7A",
          "#4F9BB3",
          "#B9854D",
          "#687DA6",
          "#858585",
        ]}
      />
    </div>
  );
};

export default SummaryStats;
