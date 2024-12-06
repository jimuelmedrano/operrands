import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datepicker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import Icon from "@/components/Icon";
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

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Errand title is required.",
  }),
  notes: z.string().optional(),
  status: z.string(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  dueDate: z.date().optional(),
  startDate: z.date({
    required_error: "Date is required.",
  }),
  repeat: z.string().min(1, {
    message: "Repeat is required.",
  }),
  repeatDayOfWeek: z.array(z.string()).nonempty({
    message: "Must select at least 1 day to repeat weekly.",
  }),
  repeatDayOfMonth: z.array(z.number()).nonempty({
    message: "Must select at least 1 day to repeat monthly.",
  }),
});

export default function ErrandEditForm(dataItem: ErrandItemProps) {
  const categoryList = getCategoryList;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: dataItem.title,
      notes: dataItem.notes,
      status: dataItem.status,
      category: dataItem.category,
      dueDate:
        dataItem.dueDate !== undefined
          ? new Date(Date.parse(dataItem.dueDate))
          : undefined,
      startDate: new Date(Date.parse(dataItem.startDate)),
      repeat: dataItem.repeat,
      repeatDayOfWeek: dataItem.repeatDayOfWeek,
      repeatDayOfMonth: dataItem.repeatDayOfMonth,
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
      handleRepeat("none");
    }
    form.setValue("category", selectedCategory);
  };

  const handleDueDate = (selectedDate?: Date) => {
    if (selectedDate !== undefined) {
      console.log(selectedDate);
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
      form.getValues("repeatDayOfWeek").length === 0 && handleSelectDays("Mon");
    }
    if (selectedRepeat !== "monthly") {
      form.getValues("repeatDayOfMonth").length === 0 &&
        handleSelectMonthlyDays(1);
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
      //@ts-ignore
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
  monthDays.sort((a, b) => a - b);
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

  useEffect(() => {
    handleCategory(dataItem.category);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Errand Title</FormLabel>
              <FormControl className="border-transparent">
                <Input placeholder="Input title..." {...field} />
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
                  selectedValue={dataItem.category}
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
                    defaultDate={form.getValues("dueDate")}
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
                    defaultDate={form.getValues("startDate")}
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
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Sun")}
                    />
                    <SelectDays
                      value="Mon"
                      handleSelect={handleSelectDays}
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Mon")}
                    />
                    <SelectDays
                      value="Tue"
                      handleSelect={handleSelectDays}
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Tue")}
                    />
                    <SelectDays
                      value="Wed"
                      handleSelect={handleSelectDays}
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Wed")}
                    />
                    <SelectDays
                      value="Thu"
                      handleSelect={handleSelectDays}
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Thu")}
                    />
                    <SelectDays
                      value="Fri"
                      handleSelect={handleSelectDays}
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Fri")}
                    />
                    <SelectDays
                      value="Sat"
                      handleSelect={handleSelectDays}
                      selected={form
                        .getValues("repeatDayOfWeek")
                        .includes("Sat")}
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
                        className="w-full  justify-between"
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
                      <div className="mb-3">
                        <h4 className="font-medium leading-none">
                          Select days
                        </h4>
                        <p className="text-sm text-muted-foreground ">
                          Maximum of 5 repeat days
                        </p>
                      </div>
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

        <div className="flex justify-end gap-3">
          <button className="flex-center bg-destructive p-2 rounded-lg gap-1">
            <Icon
              name="Trash2"
              size={20}
              className="text-destructive-foreground"
            />
          </button>

          <Button type="submit" className="text-primary-foreground">
            Save errand
          </Button>
        </div>
      </form>
    </Form>
  );
}
