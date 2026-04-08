import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IMarkAsPendingClosureProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onReject: () => void;
  status: "idle" | "loading" | "error" | "success";
}

export default function RejectTransactionForClosure({
  open,
  setOpen,
  onReject,
  status,
}: IMarkAsPendingClosureProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>Reject Transaction for closure</DialogTitle>
          <DialogDescription>
            Reject the Transaction for completion. Once Rejected, it means both
            party disagree for the Transaction to be closed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onReject}
            type="submit"
            className="bg-green-400 text-white cursor-pointer  inline-flex gap-2 items-center"
          >
            Agree/Accept{" "}
            {status === "loading" && (
              <AiOutlineLoading3Quarters className="animate-spin text-brand-primary" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
