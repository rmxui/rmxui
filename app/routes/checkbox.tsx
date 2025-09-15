import { Checkbox } from "~/components/ui/checkbox";

export default function ButtonRoute() {
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-wrap gap-[16px]">
          <Checkbox></Checkbox>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <Checkbox checked></Checkbox>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <Checkbox indeterminate></Checkbox>
        </div>
      </div>
    </>
  );
}
