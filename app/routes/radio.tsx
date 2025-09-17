import { Radio, RadioGroup } from "~/components/ui/radio";

export default function ButtonRoute() {
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <RadioGroup defaultValue="r2" className="flex flex-col">
          <Radio value="r1"></Radio>
          <Radio value="r2"></Radio>
          <Radio value="r3"></Radio>
        </RadioGroup>
        <RadioGroup defaultValue="granny" className="flex flex-col" disabled>
          <label className="flex items-center">
            <Radio value="fuji"></Radio>
            Fuji
          </label>
          <label className="flex items-center">
            <Radio value="gala"></Radio>
            Gala
          </label>
          <label className="flex items-center">
            <Radio value="granny"></Radio>
            Granny Smith
          </label>
        </RadioGroup>
      </div>
    </>
  );
}
