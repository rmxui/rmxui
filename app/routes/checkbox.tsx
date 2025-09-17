import { Checkbox } from "~/components/ui/checkbox";

export default function ButtonRoute() {
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-wrap gap-[16px]">
          <Checkbox value="c1"></Checkbox>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <Checkbox value="c2" checked></Checkbox>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <Checkbox value="c3" indeterminate></Checkbox>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <label className="flex items-center">
            <Checkbox value="c4"></Checkbox>
            Unchecked
          </label>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <label className="flex items-center">
            <Checkbox value="c5" checked></Checkbox>
            Checked
          </label>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <label className="flex items-center">
            <Checkbox value="c6" indeterminate></Checkbox>
            Indeterminate
          </label>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <label className="flex items-center">
            <Checkbox value="c7" disabled></Checkbox>
            Unchecked disabled
          </label>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <label className="flex items-center">
            <Checkbox value="c8" disabled checked></Checkbox>
            Checked disabled
          </label>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <label className="flex items-center">
            <Checkbox value="c9" disabled indeterminate></Checkbox>
            Indeterminate disabled
          </label>
        </div>
      </div>
    </>
  );
}
