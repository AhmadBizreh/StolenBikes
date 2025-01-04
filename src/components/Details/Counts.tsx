const Counts = (props: any) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 pt-5 gap-4 cursor-pointer">
        <div className="h-20 bg-white shadow-md flex items-center justify-between px-5 rounded-sm transition-transform duration-300 hover:scale-105">
          <p className="text-black text-lg font-bold">Non</p>
          <p className="py-4 text-[#7849C3] text-2xl">{props.stats.data.non}</p>
        </div>
        <div className="h-20 bg-white shadow-md flex items-center justify-between px-5 rounded-sm transition-transform duration-300 hover:scale-105">
          <p className="text-black text-lg font-bold">Stolen</p>
          <p className="py-4 text-[#7849C3] text-2xl">
            {props.stats.data.stolen}
          </p>
        </div>
        <div className="h-20 bg-white shadow-md flex items-center justify-between px-5 rounded-sm transition-transform duration-300 hover:scale-105">
          <p className="text-black text-lg font-bold">Proximity</p>
          <p className="py-4 text-[#7849C3] text-2xl">
            {props.stats.data.proximity}
          </p>
        </div>
      </div>
    </>
  );
};

export default Counts;