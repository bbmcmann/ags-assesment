import TableRow from "./TableRow";
import type { Transaction } from "../types";
import Papa from "papaparse";
import { useState } from "react";

type DatatableProps = {
  processedData: Transaction[];
  search: string;
  setSearch: (x: string) => void;
  statusFilter: string;
  setStatusFilter: (x: string) => void;
  sortDate: string;
  setSortDate: (x: string) => void;
};

// Simple table col header to abstract style
const TableHeader = ({ title }: { title: string }) => {
  return <p className="w-[180px] text-xl">{title}</p>;
};

const STATUSES = ["PENDING", "COMPLETED", "CANCELLED", "ERROR"];

const handleExport = (data: Transaction[]) => {
  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();

  URL.revokeObjectURL(url);
};

// main data table
const Datatable = ({
  processedData,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortDate,
  setSortDate,
}: DatatableProps) => {
  const [tableSize, setTableSize] = useState(10);
  const [tableStart, setTableStart] = useState(0);

  return (
    <div className="flex flex-col w-[67%] p-5">
      <div className="flex flex-row items-baseline justify-between mb-2 mt-5">
        {/* Table Search */}

        <div className="flex flex-row gap-2 ">
          <p className="text-xl">Search by player, round or game</p>
          <input
            className="border-2 border-black text-xl rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <p className="text-lg">Table Size</p>
          <select
            value={tableSize}
            onChange={(e) => setTableSize(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <button
          className="bg-orange-500 w-fit rounded-md px-2 py-1 text-lg cursor-pointer self-end"
          onClick={() => {
            handleExport(processedData);
          }}
        >
          Export
        </button>
      </div>

      {/* Table header */}
      <div className="flex flex-row border-b-2 border-b-black w-fit text-orange-600 font-bold">
        <TableHeader title="Round ID" />
        <TableHeader title="Player ID" />
        <TableHeader title="Game" />
        <TableHeader title="Bet" />
        <TableHeader title="Win" />
        <select
          className="w-[170px] text-xl"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>

          {STATUSES.map((s, i) => {
            return (
              <option value={s} key={i}>
                {s}
              </option>
            );
          })}
        </select>
        <div className="flex flex-row justify-between">
          <TableHeader title="Date" />
          <div
            className="cursor-pointer"
            onClick={() => {
              if (sortDate == "ascending") setSortDate("descending");
              else setSortDate("ascending");
            }}
          >
            {sortDate === "ascending" ? <div>^</div> : <div>v</div>}
          </div>
        </div>
      </div>
      {/* Data rows */}
      {processedData
        .slice(tableStart, tableStart + tableSize)
        .map((data, i) => {
          return <TableRow data={data} key={i} />;
        })}
      <div className="flex flex-row justify-between">
        <p
          className="cursor-pointer text-orange-600 font-bold text-xl"
          onClick={() => {
            if (tableStart > 0) setTableStart(tableStart - tableSize);
          }}
        >
          {"<"}
        </p>
        <p>
          {tableStart} - {Math.min(tableStart + tableSize, processedData.length)}
        </p>

        <p
          className="cursor-pointer text-orange-600 font-bold text-xl"
          onClick={() => {
            if (tableStart + tableSize < processedData.length)
              setTableStart(tableStart + tableSize);
          }}
        >
          {">"}
        </p>
      </div>
    </div>
  );
};

export default Datatable;
