import { Card, CardContent, CardFooter } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import moment from "moment";
import { getOrdinal, getLastDayOfTheMonth } from "@/lib/utils";
import { ErrandItemProps } from "@/lib/interface";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ErrandForm from "./ErrandForm";
import { useState } from "react";
function ErrandCard({
  dataItem,
  className,
  categoryList,
  setNotification,
}: {
  dataItem: ErrandItemProps;
  className?: string;
  categoryList?: string[];
  setNotification: (notifText: string, isSuccess?: boolean) => void;
}) {
  let dueToday = false;
  let footerText = null;
  const currentDate = new Date();

  if (dataItem.repeat === "Daily") {
    dueToday = true;
    footerText = "Daily";
  } else if (dataItem.repeat === "Weekly") {
    footerText = dataItem.repeatDayOfWeek.toString();
    //If today is included in repeat day of week, set due today to true
    dataItem.repeatDayOfWeek.find((e) => e === moment().format("ddd")) !==
      undefined && (dueToday = true);
  } else if (dataItem.repeat === "Monthly") {
    dataItem.repeatDayOfMonth.sort((a, b) => a - b);
    let MonthlyFooter: string[] = [];
    dataItem.repeatDayOfMonth.forEach((element) => {
      if (element > 31) {
        MonthlyFooter.push("Last day of the month");
        getLastDayOfTheMonth() === currentDate.getDate() && (dueToday = true);
      } else {
        MonthlyFooter.push(getOrdinal(element));
        dataItem.repeatDayOfMonth.find((e) => e === currentDate.getDate()) !==
          undefined && (dueToday = true);
      }
    });
    footerText = MonthlyFooter.toString();
  } else {
    const dueDate = moment(dataItem.dueDate + "T" + dataItem.time).toDate();
    dataItem.dueDate !== undefined &&
      (footerText = "Due: " + moment(dueDate).format("MMM Do YYYY")); //"MMM Do YYYY, h:mm a"

    dueToday =
      moment(dueDate).format("DD-MM-YYYY") ===
      moment(currentDate).format("DD-MM-YYYY");
  }

  const [isDialogOpen, setDialogOpen] = useState(false);

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
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
            <ErrandForm
              categoryList={categoryList}
              dataItem={dataItem}
              setNotification={setNotification}
              setDialogOpen={setDialogOpen}
              formType="edit"
            />
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
