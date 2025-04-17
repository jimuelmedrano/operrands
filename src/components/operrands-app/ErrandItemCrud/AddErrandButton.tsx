import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Icon from "@/components/Icon";
import ErrandForm from "./ErrandForm";
import { useState } from "react";

const AddErrandButton = ({
  setNotification,
  categoryList,
}: {
  setNotification: (notifText: string, isSuccess?: boolean) => void;
  categoryList?: string[];
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex-center bg-accent p-2 rounded-lg gap-1">
          <Icon name="Plus" size={20} className="text-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ADD NEW ERRAND</DialogTitle>
          <DialogDescription>
            Create your errands here and start tracking today.
          </DialogDescription>
        </DialogHeader>
        <ErrandForm
          setDialogOpen={setDialogOpen}
          setNotification={setNotification}
          categoryList={categoryList}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddErrandButton;
