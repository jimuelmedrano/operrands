import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Icon from "@/components/Icon";
import ErrandForm from "./ErrandForm";

const AddErrand = () => {
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
        <ErrandForm variant="add" />
      </DialogContent>
    </Dialog>
  );
};

export default AddErrand;
