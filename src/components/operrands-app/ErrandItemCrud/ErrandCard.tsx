import { Card, CardContent, CardFooter } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import ErrandForm from "./ErrandForm";
import moment from "moment";

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
  repeat: string;
  days: string;
  due: string;
}

function ErrandCard({
  dataItem,
  className,
}: {
  dataItem: ErrandItemProps;
  className?: string;
}) {
  const dueDate = moment(dataItem.due, "DD-MMM-YYYY").format("DD-MMM-YYYY");
  const currentDate = moment().format("DD-MMM-YYYY");
  let dueToday = false;
  //change the following once api for resetting daily task is available
  if (dataItem.repeat === "daily") {
    dueToday = true;
    dataItem.due = currentDate;
  } else {
    dueToday = dueDate === currentDate ? true : false;
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
                  "font-ubuntu leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate pr-3 " +
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
              <DialogTitle>Edit errand</DialogTitle>
              <DialogDescription>
                Modify your errands here and start tracking today.
              </DialogDescription>
            </DialogHeader>
            <ErrandForm variant="edit" />
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="absolute bottom-0 right-2 opacity-50">
        <span
          className={
            "text-xs " +
            (dueToday ? "text-primary-foreground" : "text-foreground")
          }
        >
          {dataItem.due}
        </span>
      </CardFooter>
    </Card>
  );
}

export default ErrandCard;
