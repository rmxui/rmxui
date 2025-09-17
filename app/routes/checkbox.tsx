import { useState } from "react";
import { Checkbox, CheckboxGroup } from "~/components/ui/checkbox";
import { Field, FieldLabel } from "~/components/ui/field";

const apples = ["fuji", "gala", "granny"];

export default function ButtonRoute() {
  const [value, setValue] = useState<string[]>([]);
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
        <div className="flex flex-wrap gap-[16px]">
          <Field invalid>
            <FieldLabel className="flex items-center">
              <Checkbox value="c10"></Checkbox>
              Unchecked error
            </FieldLabel>
          </Field>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <Field invalid>
            <FieldLabel className="flex items-center">
              <Checkbox value="c11" checked></Checkbox>
              Checked error
            </FieldLabel>
          </Field>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          <Field invalid>
            <FieldLabel className="flex items-center">
              <Checkbox value="c12" indeterminate></Checkbox>
              Indeterminate error
            </FieldLabel>
          </Field>
        </div>
      </div>
      <div className="mt-[16px]">Checkbox group</div>
      <div className="flex flex-col gap-[16px]">
        <CheckboxGroup
          aria-labelledby="apples-caption"
          value={value}
          onValueChange={setValue}
          allValues={apples}
          className="flex flex-col"
        >
          <label id="apples-caption" className="flex items-center">
            <Checkbox
              name="apples"
              parent
              indeterminate={value.length > 0 && value.length < 3}
            ></Checkbox>
            Apples
          </label>
          <label className="flex items-center">
            <Checkbox value="fuji"></Checkbox>
            Fuji
          </label>
          <label className="flex items-center">
            <Checkbox value="gala"></Checkbox>
            Gala
          </label>
          <label className="flex items-center">
            <Checkbox value="granny"></Checkbox>
            Granny Smith
          </label>
        </CheckboxGroup>
      </div>
    </>
  );
}
