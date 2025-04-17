import { useState } from "react";
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

import { CategorySearch } from "../../ui/categorysearch";
import { SelectDays, SelectDaysOfMonth } from "./SelectDaysToggle";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import moment from "moment";
import { addNewErrand, deleteErrand, editErrand } from "@/lib/firebase/errands";
import { auth } from "@/lib/firebase/config";
import { FormSchema } from "@/lib/formSchema";
import { ErrandItemProps } from "@/lib/interface";
import Icon from "@/components/Icon";

export default function ErrandForm({
  setDialogOpen,
  setNotification,
  categoryList,
  formType,
  dataItem,
}: {
  setDialogOpen?: (isFormOpen: boolean) => void;
  setNotification: (notifText: string, isSuccess?: boolean) => void;
  categoryList?: string[];
  formType?: string;
  dataItem?: ErrandItemProps;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: dataItem ? dataItem.id : "",
      user:
        auth.currentUser?.email === null ? undefined : auth.currentUser?.email,
      title: dataItem ? dataItem.title : "",
      notes: dataItem ? dataItem.notes : "",
      status: dataItem ? dataItem.status : "todo",
      category: dataItem ? dataItem.category : "",
      dueDate: dataItem ? dataItem.title : "",
      startDate: dataItem ? dataItem.startDate : "",
      time: dataItem ? dataItem.time : "",
      repeat: dataItem ? dataItem.repeat : "none",
      repeatDayOfWeek: dataItem ? dataItem.repeatDayOfWeek : ["Mon"],
      repeatDayOfMonth: dataItem ? dataItem.repeatDayOfMonth : [1],
      addedDate: new Date(),
    },
  });

  const [repeatItem, setRepeatItem] = useState(form.getValues("repeat"));
  const [monthDays, setMonthDays] = useState(
    form.getValues("repeatDayOfMonth")
  );

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSaving(true);
    try {
      if (formType === "edit") {
        await editErrand(data as any);
      } else {
        await addNewErrand(data as any);
      }

      setDialogOpen && setDialogOpen(false);
      setIsSaving(false);
      setNotification("Successfuly saved errand.", true);
      //getErrandList();
    } catch (err) {
      setIsSaving(false);
      setNotification("Failed to save errand.", false);
      console.error(err);
    }
  };

  const onDelete = async () => {
    setIsSaving(true);
    try {
      await deleteErrand(form.getValues().id!);
      setDialogOpen && setDialogOpen(false);
      setIsSaving(false);
      setNotification("Successfuly deleted errand.", true);
      //getErrandList();
    } catch (err) {
      setIsSaving(false);
      setNotification("Failed to delete errand.", false);
      console.error(err);
    }
  };

  const handleCategory = (selectedCategory: string) => {
    if (
      selectedCategory === "Daily" ||
      selectedCategory === "Weekly" ||
      selectedCategory === "Monthly"
    ) {
      handleRepeat(selectedCategory);
    } else {
      handleRepeat("none");
    }
    form.setValue("category", selectedCategory);
  };

  const handleDueDate = (selectedDate?: string) => {
    if (selectedDate !== undefined) {
      form.setValue("dueDate", selectedDate);
    }
  };
  const handleTime = (selectedTime?: string) => {
    if (selectedTime !== undefined) {
      form.setValue("time", selectedTime);
    }
  };

  const handleStartDate = (selectedDate?: string) => {
    if (selectedDate !== undefined) {
      form.setValue("startDate", selectedDate);
    }
  };

  const handleRepeat = (selectedRepeat: string) => {
    if (selectedRepeat !== "Weekly") {
      form.getValues("repeatDayOfWeek").length === 0 && handleSelectDays("Mon");
    }
    if (selectedRepeat !== "Monthly") {
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
                  handleSelect={handleCategory}
                  selectedValue={form.getValues("category")}
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
                {...(form.getValues("category") === "Daily" ||
                form.getValues("category") === "Weekly" ||
                form.getValues("category") === "Monthly"
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
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
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
                    handleSelectTime={handleTime}
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
                    handleSelectTime={handleTime}
                    defaultDate={
                      dataItem?.startDate
                        ? moment(
                            form.getValues("startDate") +
                              "T" +
                              form.getValues("time")
                          ).toDate()
                        : new Date()
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {repeatItem === "Weekly" && (
          <FormField
            control={form.control}
            name="repeatDayOfWeek"
            render={() => (
              <FormItem>
                <FormLabel>Repeat every</FormLabel>
                <FormControl className="border-transparent">
                  <div className="flex-center gap-2">
                    <SelectDays value="Sun" handleSelect={handleSelectDays} />
                    <SelectDays
                      value="Mon"
                      handleSelect={handleSelectDays}
                      selected
                    />
                    <SelectDays value="Tue" handleSelect={handleSelectDays} />
                    <SelectDays value="Wed" handleSelect={handleSelectDays} />
                    <SelectDays value="Thu" handleSelect={handleSelectDays} />
                    <SelectDays value="Fri" handleSelect={handleSelectDays} />
                    <SelectDays value="Sat" handleSelect={handleSelectDays} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {repeatItem === "Monthly" && (
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
          {formType === "edit" && (
            <Button
              variant="destructive"
              type="button"
              className="flex-center bg-destructive p-2 rounded-lg gap-1"
              onClick={onDelete}
            >
              <Icon
                name="Trash2"
                size={20}
                className="text-destructive-foreground"
              />
            </Button>
          )}

          <Button type="submit" className="text-primary-foreground">
            {isSaving ? "Saving..." : "Save Errand"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
