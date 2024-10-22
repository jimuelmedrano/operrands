import { useState } from "react";
import { Button } from "@/components/ui/button";

function SelectDays({
  handleSelect,
  value,
  selected,
}: {
  handleSelect: (selectedDay: string) => void;
  value: string;
  selected?: boolean;
}) {
  const [variantState, setVariantState] = useState(
    selected === undefined ? false : true
  );
  function handleVariantState() {
    setVariantState(!variantState);
  }
  return (
    <Button
      className="w-11"
      type="button"
      variant={variantState ? "default" : "outline"}
      onClick={() => {
        handleVariantState();
        handleSelect(value);
      }}
    >
      {value}
    </Button>
  );
}

function SelectDaysNumber({
  handleSelect,
  value,
  text,
  selected,
  className,
}: {
  handleSelect: (selectedDay: number) => void;
  value: number;
  text: string;
  selected?: boolean;
  className?: string;
}) {
  const [variantState, setVariantState] = useState(
    selected === undefined ? false : true
  );
  function handleVariantState() {
    setVariantState(!variantState);
  }
  return (
    <Button
      className={"w-10 text-sm " + className}
      type="button"
      variant={variantState ? "default" : "ghost"}
      onClick={() => {
        handleVariantState();
        handleSelect(value);
      }}
    >
      {text}
    </Button>
  );
}

function SelectDaysOfMonth({
  handleSelectDaysOfMonth,
  selectedDays,
}: {
  handleSelectDaysOfMonth: (selectedDay: number) => void;
  selectedDays: number[];
}) {
  const days = [];

  for (let i = 1; i <= 31; i++) {
    days.push(
      <SelectDaysNumber
        key={i}
        value={i}
        text={"" + i}
        handleSelect={handleSelectDaysOfMonth}
        {...(i === selectedDays.find((elem) => elem === i)
          ? { selected: true }
          : {})}
      />
    );
  }

  return (
    <div className="grid grid-cols-5 w-fit gap-x-1 gap-y-2">
      {days}
      <SelectDaysNumber
        className="col-span-4 w-full"
        value={32}
        text={"Last day of the month"}
        handleSelect={handleSelectDaysOfMonth}
        {...(32 === selectedDays.find((elem) => elem === 32)
          ? { selected: true }
          : {})}
      />
    </div>
  );
}

export { SelectDays, SelectDaysOfMonth };
