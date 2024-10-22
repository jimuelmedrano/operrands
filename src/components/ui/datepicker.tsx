import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  handleSelect,
  defaultDate,
  className,
}: {
  handleSelect: (newType?: Date) => void;
  defaultDate?: Date;
  className?: string;
}) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-40 flex justify-between text-left font-normal ",
            !date && "text-muted-foreground ",
            className
          )}
        >
          {date ? (
            <span className="font-ubuntu">{format(date, "PPP")}</span>
          ) : (
            <span className="text-foreground opacity-50">Select Date</span>
          )}
          <CalendarIcon className=" h-4 w-4 opacity-50 text-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          selected={date}
          onSelect={(currentValue) => {
            setDate(currentValue);
            handleSelect(currentValue);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
