import * as React from "react";
import Icon from "../Icon";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CategoryListProps {
  value: string;
  label: string;
}

export function CategorySearch({
  categoryList,
  selectedValue,
  handleSelect,
  className,
}: {
  categoryList: CategoryListProps[];
  selectedValue?: string;
  handleSelect: (newType: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const items = categoryList;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={"w-52 justify-between " + className}
        >
          {value ? (
            <span className="font-jockey">
              {items.find((item) => item.value === value)?.label}
            </span>
          ) : selectedValue ? (
            <span className="font-jockey">
              {items.find((item) => item.value === selectedValue)?.label}
            </span>
          ) : (
            <span className="opacity-50 text-foreground">Select category</span>
          )}
          <Icon
            name="ChevronsUpDown"
            className="h-4 w-4 opacity-50 text-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  className="font-jockey"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    handleSelect(currentValue === value ? "" : currentValue);

                    setOpen(false);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
