import { useState } from "react";
import { Checkbox, CheckboxGroup } from "~/components/ui/checkbox";

const apples = ["fuji", "gala", "granny"];
export default function CheckboxRoute() {
  const [value, setValue] = useState(["gala"]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4"></div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center">
            <Checkbox />
            <Checkbox checked />
            <Checkbox indeterminate />
          </div>
          <div className="flex flex-col items-center">
            <Checkbox disabled />
            <Checkbox checked disabled />
            <Checkbox indeterminate disabled />
          </div>
          <div className="flex flex-col items-center">
            <CheckboxGroup
              allValues={apples}
              value={value}
              onValueChange={(value) => setValue(value)}
            >
              <label id="apples" className="flex items-center">
                <Checkbox parent />
                Apples
              </label>
              {apples.map((apple) => (
                <label
                  key={apple}
                  id={apple}
                  className="ms-2 flex items-center"
                >
                  <Checkbox value={apple} />
                  <span className="first-letter:uppercase">{apple}</span>
                </label>
              ))}
            </CheckboxGroup>
          </div>
          <div className="flex flex-col items-center">
            <CheckboxGroup
              allValues={apples}
              value={value}
              onValueChange={(value) => setValue(value)}
              disabled
              className="data-disabled:*:[label]:text-on-surface/38"
            >
              <label id="apples" className="flex items-center">
                <Checkbox parent />
                Apples
              </label>
              {apples.map((apple) => (
                <label
                  key={apple}
                  id={apple}
                  className="ms-2 flex items-center"
                >
                  <Checkbox value={apple} />
                  <span className="first-letter:uppercase">{apple}</span>
                </label>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </>
  );
}
