import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import { Get, GetCounts } from "../../Hooks/useBikes";
import HomeCard from "../../components/HomeCard";
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import Counts from "../../components/Details/Counts";

const Index = () => {

  const [initialFilters, setInitialFilters] = useState({
    page: 1,
    per_page: 12,
    location: "Munich",
  });
  const Bikes = Get(initialFilters);
  const Stats = GetCounts();
  if (Bikes.isFetching) return <Loader />;
  return (
    <>
      <Counts stats={Stats} />
      <div className="px-5 pt-5">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
        {Bikes.data &&
          Bikes.data.length > 0 &&
          Bikes?.data?.map((data: any) => (
            <HomeCard data={data} key={data.id} />
          ))}
      </div>
      <div className="flex justify-center">
        <Pagination
          total={initialFilters.page + 10}
          initialPage={initialFilters.page}
          className="my-2"
          onChange={async (e: number) => {
            await setInitialFilters((prevFilters) => ({
              ...prevFilters,
              page: e,
            }));
            Bikes.refetch();
          }}
        />
      </div>
    </>
  );
};

export default Index;
