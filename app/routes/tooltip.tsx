import { StarIcon } from "lucide-react";
import {
  Tooltip,
  TooltipAction,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { EditIcon } from "~/icons";

export default function TooltipDemo() {
  const rich = {
    title: "Rich tooltip",
    description:
      "Rich tooltips bring attention to a particular element of feature that warrants the user's focus.",
  };
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-[16px]">
        <div className="flex gap-[16px] mt-[16px]">
          <Tooltip>
            <TooltipTrigger>
              <EditIcon />
            </TooltipTrigger>
            <TooltipContent description="Edit tooltip"></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <StarIcon />
            </TooltipTrigger>
            <TooltipContent description="Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholdings."></TooltipContent>
          </Tooltip>
        </div>
        <div className="flex gap-[16px]">
          <Tooltip rich>
            <TooltipTrigger>
              <EditIcon />
            </TooltipTrigger>
            <TooltipContent
              {...rich}
              actions={
                <>
                  <TooltipAction>Action</TooltipAction>
                  <TooltipAction>Action</TooltipAction>
                </>
              }
            ></TooltipContent>
          </Tooltip>
          <Tooltip rich>
            <TooltipTrigger>
              <EditIcon />
            </TooltipTrigger>
            <TooltipContent
              {...rich}
              actions={<TooltipAction>Action</TooltipAction>}
            ></TooltipContent>
          </Tooltip>
          <Tooltip rich>
            <TooltipTrigger>
              <EditIcon />
            </TooltipTrigger>
            <TooltipContent {...rich}></TooltipContent>
          </Tooltip>
          <Tooltip rich>
            <TooltipTrigger>
              <EditIcon />
            </TooltipTrigger>
            <TooltipContent
              {...rich}
              title={undefined}
              actions={<TooltipAction>Action</TooltipAction>}
            ></TooltipContent>
          </Tooltip>
          <Tooltip rich>
            <TooltipTrigger>
              <EditIcon />
            </TooltipTrigger>
            <TooltipContent
              {...rich}
              title={undefined}
              actions={
                <>
                  <TooltipAction>Action</TooltipAction>
                  <TooltipAction>Action</TooltipAction>
                </>
              }
            ></TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
