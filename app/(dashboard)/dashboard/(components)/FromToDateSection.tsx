import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toDate } from "date-fns";
import moment from "moment";
import { MdOutlineDateRange } from "react-icons/md";
interface FromToDateSectionProps {
  setFromDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  fromDate?: Date;
  setToDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  toDate?: Date;
}

export default function FromToDateSection({
  setFromDate,
  fromDate,
  setToDate,
  toDate,
}: FromToDateSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              " justify-start gap-2 text-left font-normal",
              !fromDate && "text-muted-foreground"
            )}
          >
            {fromDate ? (
              moment(fromDate).format("DD MMM, YYYY")
            ) : (
              <span>From</span>
            )}
            <MdOutlineDateRange className="" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={(days) => setFromDate(days)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            // onClick={(e) => e.stopPropagation()}
            className={cn(
              " justify-start gap-2 text-left font-normal",
              !toDate && "text-muted-foreground"
            )}
          >
            {toDate ? moment(toDate).format("DD MMM, YYYY") : <span>To</span>}
            <MdOutlineDateRange className="" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={setToDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
