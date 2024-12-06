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
  const [variantState, setVariantState] = useState(selected);
  function handleVariantState() {
    setVariantState(!variantState);
  }
  return (
    <Button
      className="w-11 "
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
  isDisabled,
}: {
  handleSelect: (selectedDay: number) => void;
  value: number;
  text: string;
  selected?: boolean;
  className?: string;
  isDisabled?: boolean;
}) {
  const [variantState, setVariantState] = useState(selected);
  function handleVariantState() {
    setVariantState(!variantState);
  }
  return (
    <Button
      className={"w-10 text-sm " + className}
      type="button"
      variant={variantState ? "default" : "ghost"}
      disabled={isDisabled}
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
  const isMaximum = selectedDays.length > 4;
  for (let i = 1; i <= 31; i++) {
    const isSelected = i === selectedDays.find((elem) => elem === i);
    days.push(
      <SelectDaysNumber
        key={i}
        value={i}
        text={"" + i}
        {...(isMaximum ? { isDisabled: !isSelected } : { isDisabled: false })}
        handleSelect={handleSelectDaysOfMonth}
        {...(isSelected ? { selected: true } : {})}
      />
    );
  }
  const isLastDaySelected = 32 === selectedDays.find((elem) => elem === 32);
  return (
    <div className="grid grid-cols-5 w-fit gap-x-1 gap-y-2">
      {days}
      <SelectDaysNumber
        className="col-span-4 w-full"
        value={32}
        text={"Last day of the month"}
        handleSelect={handleSelectDaysOfMonth}
        {...(isMaximum
          ? { isDisabled: !isLastDaySelected }
          : { isDisabled: false })}
        {...(isLastDaySelected ? { selected: true } : {})}
      />
    </div>
  );
}

export { SelectDays, SelectDaysOfMonth };
