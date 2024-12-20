import { Card, CardContent, CardFooter } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import ErrandEditForm from "./ErrandEditForm";
import moment from "moment";
import { getOrdinal, getLastDayOfTheMonth } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ErrandItemProps {
  id: number;
  title: string;
  notes: string;
  status: string;
  category: string;
  startDate: string;
  repeat: string;
  repeatDayOfWeek: string[];
  repeatDayOfMonth: number[];
  dueDate?: string;
}

function ErrandCard({
  dataItem,
  className,
}: {
  dataItem: ErrandItemProps;
  className?: string;
}) {
  let dueToday = false;
  let footerText = null;
  const currentDate = new Date();

  if (dataItem.repeat === "daily") {
    dueToday = true;
    footerText = "Daily";
  } else if (dataItem.repeat === "weekly") {
    footerText = dataItem.repeatDayOfWeek.toString();
    //If today is included in repeat day of week, set due today to true
    dataItem.repeatDayOfWeek.find((e) => e === moment().format("ddd")) !==
      undefined && (dueToday = true);
  } else if (dataItem.repeat === "monthly") {
    dataItem.repeatDayOfMonth.sort((a, b) => a - b);
    let monthlyFooter: string[] = [];
    dataItem.repeatDayOfMonth.forEach((element) => {
      if (element > 31) {
        monthlyFooter.push("Last day of the month");
        getLastDayOfTheMonth() === currentDate.getDate() && (dueToday = true);
      } else {
        monthlyFooter.push(getOrdinal(element));
        dataItem.repeatDayOfMonth.find((e) => e === currentDate.getDate()) !==
          undefined && (dueToday = true);
      }
    });
    footerText = monthlyFooter.toString();
  } else {
    dataItem.dueDate !== undefined &&
      (footerText = moment(Date.parse(dataItem.dueDate)).format("DD-MMM-YYYY"));
  }

  return (
    <Card
      className={
        "w-full h-16 relative px-3 py-0 " +
        (dueToday ? "bg-primary" : " bg-background") +
        " " +
        className
      }
    >
      <CardContent className="flex h-full items-center gap-3">
        <Checkbox
          id={"task" + dataItem.id}
          className={
            "bg-accent " +
            (dueToday
              ? "border-primary text-primary-foreground"
              : "text-foreground")
          }
        />
        <Dialog>
          <DialogTrigger className="w-full h-full">
            <div className="leading-none flex flex-col items-start justify-center  ">
              <span
                className={
                  " leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate pr-3 " +
                  (dueToday ? "text-primary-foreground" : "text-foreground")
                }
              >
                {dataItem.title}
              </span>
              <p
                className={
                  "text-xs truncate opacity-70 pr-5 " +
                  (dueToday ? "text-primary-foreground" : "text-foreground")
                }
              >
                {dataItem.notes}
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>EDIT ERRAND</DialogTitle>
              <DialogDescription>
                Modify your errands here and start tracking today.
              </DialogDescription>
            </DialogHeader>
            <ErrandEditForm {...dataItem} />
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="absolute bottom-0 right-2 opacity-50">
        <span
          className={
            "text-xs  " +
            (dueToday ? "text-primary-foreground" : "text-foreground")
          }
        >
          {footerText}
        </span>
      </CardFooter>
    </Card>
  );
}

export default ErrandCard;
