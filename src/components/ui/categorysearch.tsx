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

export function CategorySearch({
  categoryList,
  selectedValue,
  handleSelect,
  className,
}: {
  categoryList: string[] | undefined;
  selectedValue?: string;
  handleSelect: (newType: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
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
          {selectedValue ? (
            <span>{selectedValue}</span>
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
              {items ? (
                items.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue);

                      setOpen(false);
                    }}
                  >
                    {item}
                  </CommandItem>
                ))
              ) : (
                <></>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
