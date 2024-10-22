import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datepicker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Icon from "../../Icon";
import { CategorySearch } from "../../ui/categorysearch";
import { SelectDays, SelectDaysOfMonth } from "./SelectDaysToggle";

import getCategoryList from "../../../../sample-data/getCategoryList.json";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { JSX } from "react/jsx-runtime";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Errand title is required.",
  }),
  notes: z.string().optional(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  dueDate: z.date().optional(),
  startDate: z.date({
    required_error: "Date is required.",
  }),
  repeat: z.string(),
  repeatDayOfWeek: z.array(z.string()).nonempty({
    message: "Must select at least 1 day to repeat weekly.",
  }),
  repeatDayOfMonth: z.array(z.number()),
});

export default function AddErrand() {
  const categoryList = getCategoryList;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      notes: "",
      category: "",
      dueDate: undefined,
      startDate: new Date(),
      repeat: "none",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    },
  });

  const [repeatItem, setRepeatItem] = useState(form.getValues("repeat"));
  const [monthDays, setMonthDays] = useState(
    form.getValues("repeatDayOfMonth")
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  const handleCategory = (selectedCategory: string) => {
    if (
      selectedCategory === "daily" ||
      selectedCategory === "weekly" ||
      selectedCategory === "monthly"
    ) {
      handleRepeat(selectedCategory);
    } else {
      handleRepeat("");
    }
    form.setValue("category", selectedCategory);
  };

  const handleDueDate = (selectedDate?: Date) => {
    if (selectedDate !== undefined) {
      form.setValue("dueDate", selectedDate);
    }
  };

  const handleStartDate = (selectedDate?: Date) => {
    if (selectedDate !== undefined) {
      form.setValue("startDate", selectedDate);
    }
  };

  const handleRepeat = (selectedRepeat: string) => {
    if (selectedRepeat !== "weekly") {
      form.setValue("repeatDayOfWeek", ["Mon"]);
    }
    setRepeatItem(selectedRepeat);
    form.setValue("repeat", selectedRepeat);
  };

  const handleSelectDays = (selectedDay: string) => {
    let repeatDayNewValue = form.getValues("repeatDayOfWeek");
    const itemExists = repeatDayNewValue.find((dayValue) => {
      return dayValue === selectedDay;
    });
    if (itemExists) {
      const filteredData = repeatDayNewValue.filter((e) => e !== selectedDay);
      //@ts-ignore
      form.setValue("repeatDayOfWeek", filteredData);
    } else {
      repeatDayNewValue.push(selectedDay);
      form.setValue("repeatDayOfWeek", repeatDayNewValue);
    }
  };

  const handleSelectMonthlyDays = (selectedDay: number) => {
    let repeatDayNewValue = form.getValues("repeatDayOfMonth");
    const itemExists = repeatDayNewValue.find((dayValue) => {
      return dayValue === selectedDay;
    });
    if (itemExists) {
      const filteredData = repeatDayNewValue.filter((e) => e !== selectedDay);
      setMonthDays(filteredData);
      //@ts-ignore
      form.setValue("repeatDayOfMonth", filteredData);
    } else {
      repeatDayNewValue.push(selectedDay);
      setMonthDays(repeatDayNewValue);
      form.setValue("repeatDayOfMonth", repeatDayNewValue);
    }
  };

  const selectedDayOfMonth: JSX.Element[] = [];
  monthDays.forEach((element) => {
    selectedDayOfMonth.push(
      <div
        key={element}
        className="bg-primary text-primary-foreground px-3 py-1 rounded-sm"
      >
        {element === 32 ? "Last day of the month" : element}
      </div>
    );
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex-center bg-accent p-2 rounded-lg gap-1">
          <Icon name="Plus" size={20} className="text-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new errand</DialogTitle>
          <DialogDescription>
            Create your errands here and start tracking today.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Errand Title</FormLabel>
                  <FormControl className="border-transparent">
                    <Input
                      className="font-ubuntu"
                      placeholder="Input title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Input errand notes..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl className="border-transparent">
                    <CategorySearch
                      categoryList={categoryList}
                      handleSelect={handleCategory}
                      className="w-full"
                    />
                  </FormControl>
                  {form.getValues("category") === "" && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repeat"
              render={() => (
                <FormItem>
                  <FormLabel>Repeat</FormLabel>
                  <Select
                    onValueChange={handleRepeat}
                    defaultValue={form.getValues("repeat")}
                    value={form.getValues("repeat")}
                    {...(form.getValues("category") === "daily" ||
                    form.getValues("category") === "weekly" ||
                    form.getValues("category") === "monthly"
                      ? { disabled: true }
                      : { disabled: false })}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={
                          "no-transition " +
                          (repeatItem === "" ? "opacity-50 " : "opacity-100")
                        }
                      >
                        <SelectValue placeholder="Select repeat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {repeatItem === "none" && (
              <FormField
                control={form.control}
                name="dueDate"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        className="w-full"
                        handleSelect={handleDueDate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {repeatItem !== "none" && (
              <FormField
                control={form.control}
                name="startDate"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        className="w-full"
                        handleSelect={handleStartDate}
                        defaultDate={new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {repeatItem === "weekly" && (
              <FormField
                control={form.control}
                name="repeatDayOfWeek"
                render={() => (
                  <FormItem>
                    <FormLabel>Repeat every</FormLabel>
                    <FormControl className="border-transparent">
                      <div className="flex-center gap-2">
                        <SelectDays
                          value="Sun"
                          handleSelect={handleSelectDays}
                        />
                        <SelectDays
                          value="Mon"
                          handleSelect={handleSelectDays}
                          selected
                        />
                        <SelectDays
                          value="Tue"
                          handleSelect={handleSelectDays}
                        />
                        <SelectDays
                          value="Wed"
                          handleSelect={handleSelectDays}
                        />
                        <SelectDays
                          value="Thu"
                          handleSelect={handleSelectDays}
                        />
                        <SelectDays
                          value="Fri"
                          handleSelect={handleSelectDays}
                        />
                        <SelectDays
                          value="Sat"
                          handleSelect={handleSelectDays}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {repeatItem === "monthly" && (
              <FormField
                control={form.control}
                name="repeatDayOfMonth"
                render={() => (
                  <FormItem>
                    <FormLabel>Repeat every</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full font-ubuntu justify-between"
                          >
                            <div className="flex gap-1">
                              {selectedDayOfMonth.length === 0
                                ? "Select repeat day"
                                : selectedDayOfMonth}
                            </div>

                            <CalendarIcon className=" h-4 w-4 opacity-50 text-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                          <SelectDaysOfMonth
                            handleSelectDaysOfMonth={handleSelectMonthlyDays}
                            selectedDays={monthDays}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="pt-5">
              <Button
                type="submit"
                className="font-koulen text-primary-foreground"
              >
                Save errand
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
