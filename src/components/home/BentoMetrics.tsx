const BentoMetrics = ({
  todayCount,
  overdueCount,
  allCount,
}: {
  todayCount: number;
  overdueCount: number;
  allCount: number;
}) => {
  return (
    <div className="flex-col-center gap-2">
      <div className="flex gap-3">
        <div className="bg-primary dark:bg-primaryDark w-36 h-24 rounded-lg flex flex-col p-3 justify-between">
          <div className="flex">
            <span className="text-xs text-inverted">Today's Errands</span>
          </div>
          <div className="flex justify-end">
            <span className="text-4xl text-inverted">{todayCount}</span>
          </div>
        </div>
        <div className="bg-primary dark:bg-primaryDark w-36 h-24 rounded-lg flex flex-col p-3 justify-between">
          <div className="flex">
            <span className="text-xs text-inverted">Overdue Errands</span>
          </div>
          <div className="flex justify-end">
            <span className="text-4xl text-inverted">{overdueCount}</span>
          </div>
        </div>
      </div>
      <div className="bg-primaryDark dark:bg-primary w-full rounded-lg flex p-3 justify-between">
        <div className="flex">
          <span className="text-xs">All Tasks</span>
        </div>
        <div className="flex justify-end">
          <span className="text-3xl">{allCount}</span>
        </div>
      </div>
    </div>
  );
};

export default BentoMetrics;
