import moment from "moment";

interface ErrandItemProps {
  title: string;
  notes: string;
  status: string;
  repeat: string;
  days: string;
  due: string;
}

function ErrandItem(dataItem: { dataItem: ErrandItemProps }) {
  const dueDate = moment(dataItem.dataItem.due).format("DD-MMM-YYYY");
  const currentDate = moment().format("DD-MMM-YYYY");
  let dueToday = false;
  //change the following once api for resetting daily task is available
  if (dataItem.dataItem.repeat === "daily") {
    dueToday = true;
    dataItem.dataItem.due = currentDate;
  } else {
    dueToday = dueDate === currentDate ? true : false;
  }

  return (
    <div
      className={
        "flex items-center w-full h-16 rounded-xl px-3 gap-3 relative " +
        (dueToday
          ? "bg-primary dark:bg-primaryDark"
          : " bg-white dark:bg-secondary")
      }
    >
      <div>
        <input
          type="checkbox"
          className={
            "bg-secondary dark:bg-secondaryDark w-6 h-6 rounded-md border-none focus:ring-0 focus:ring-offset-0 " +
            (dueToday ? "text-primary dark:text-primaryDark" : "text-black")
          }
        />
      </div>
      <div>
        <div className="-mb-1">
          <p
            className={
              "font-koulen text-sm " +
              (dueToday ? "text-inverted" : "dark:text-black")
            }
          >
            {dataItem.dataItem.title}
          </p>
        </div>
        <div className="w-48">
          <p
            className={
              "text-xs truncate " +
              (dueToday ? "text-inverted" : "dark:text-black")
            }
          >
            {dataItem.dataItem.notes}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-2 opacity-50">
        <span
          className={
            "text-xs " + (dueToday ? "text-inverted" : "dark:text-black")
          }
        >
          {dataItem.dataItem.due}
        </span>
      </div>
    </div>
  );
}

export default ErrandItem;
