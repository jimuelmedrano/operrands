import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

import Icon from "../Icon";
import { CategorySearch } from "../ui/categorysearch";

import getCategoryList from "../../../sample-data/getCategoryList.json";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Errand title is required.",
  }),
  notes: z.string(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
});

export default function AddErrand() {
  const categoryList = getCategoryList;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      notes: "",
      category: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  const handleCategory = (selectedCategory: string) => {
    form.setValue("category", selectedCategory);
  };

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
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Errand Title</FormLabel>
                  <FormControl>
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
                  <FormControl>
                    <CategorySearch
                      categoryList={categoryList}
                      handleSelect={handleCategory}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
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
