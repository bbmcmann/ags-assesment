import { useEffect, useMemo, useState } from "react";
import Datatable from "../components/Datatable";
import { useSearchParams } from "react-router-dom";
import type { Transaction } from "../types";
import axios from "axios";
import SummaryStats from "../components/SummaryStats";
import logo from "../../public/ags.png";

const API_URL =
  "https://e5ed7cbe-e5d1-4c14-bacc-2fce88fd8a29.mock.pstmn.io/api/v1/transactions";

const Dashboard = () => {
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState(
    () => searchParams.get("status") ?? "all",
  );
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [sortDate, setSortDate] = useState(
    () => searchParams.get("sortDate") ?? "ascending",
  );

  //   handle status filter changes
  useEffect(() => {
    setSearchParams((prev) => {
      if (statusFilter === "all") {
        prev.delete("status");
      } else {
        prev.set("status", statusFilter);
      }
      return prev;
    });
  }, [statusFilter]);

  //   handle search changes
  useEffect(() => {
    setSearchParams((prev) => {
      if (search) {
        prev.set("search", search);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  }, [search]);

  //   handle sort changes
  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("sortDate", sortDate);
      return prev;
    });
  }, [sortDate]);

  //   The main processing of data, display, export, and aggregate stats pull from this
  const processedData = useMemo(() => {
    return [...transactionData]
      .filter((x) => {
        // Filter status
        if (statusFilter !== "all" && x.status !== statusFilter) {
          return false;
        }
        //   Filter search
        if (
          !x.playerId.toLowerCase().includes(search.toLowerCase()) &&
          !x.roundId.toLowerCase().includes(search.toLowerCase()) &&
          !x.gameName.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortDate === "ascending")
          return (
            new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
          );
        return (
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        );
      });
  }, [transactionData, statusFilter, search, sortDate]);

  //   data loader
  const loadData = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res);
      setTransactionData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* header */}
      <div className=" flex flex-row justify-between">
        <p className="text-5xl text-orange-600 font-bold p-4">
          AGS Transactions Dashboard
        </p>
        <img src={logo} alt="Company Logo" className="w-[200px] h-auto" />
      </div>
      {/* Main content */}
      {transactionData && transactionData.length > 0 ? (
        <div className="flex flex-row">
          <Datatable
            processedData={processedData}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortDate={sortDate}
            setSortDate={setSortDate}
          />
          <SummaryStats data={processedData} />
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default Dashboard;
