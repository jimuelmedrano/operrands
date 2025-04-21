import { z } from "zod";
export const FormSchema = z.object({
  id: z.string().optional(),
  user: z.string(),
  title: z.string().min(1, {
    message: "Errand title is required.",
  }),
  notes: z.string().optional(),
  status: z.string(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  dueDate: z.string().optional(),
  startDate: z.string({
    required_error: "Date is required.",
  }),
  time: z.string().optional(),
  repeat: z.string().min(1, {
    message: "Repeat is required.",
  }),
  repeatDayOfWeek: z.array(z.string()).nonempty({
    message: "Must select at least 1 day to repeat Weekly.",
  }),
  repeatDayOfMonth: z.array(z.number()).nonempty({
    message: "Must select at least 1 day to repeat Monthly.",
  }),
  addedDate: z.date(),
});
