import { useState } from "react";
import { Text } from "~/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

const sizes = [
  "icon-xs",
  "xs",
  "icon-sm",
  "sm",
  "icon-md",
  "md",
  "icon-lg",
  "lg",
  "icon-xl",
  "xl",
] as const;
const types = ["single", "multiple"] as const;

export default function ToggleGroupRoute() {
  const [type, setType] = useState<any>("single");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          <label htmlFor="type">Selection:</label>
          <select
            id="type"
            className="border outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center gap-4">
          {sizes.map((size) => {
            const s = size.replace("icon-", "") as any;
            const c = size.startsWith("icon") ? "sr-only" : undefined;
            return (
              <ToggleGroup
                key={`${size}-${type}`}
                size={s}
                multiple={type === "multiple"}
              >
                <ToggleGroupItem size={size}>
                  <PencilIcon />
                  <Text className={c}>Edit</Text>
                </ToggleGroupItem>
                <ToggleGroupItem size={size}>
                  <PencilIcon />
                  <Text className={c}>Edit</Text>
                </ToggleGroupItem>
                <ToggleGroupItem size={size}>
                  <PencilIcon />
                  <Text className={c}>Edit</Text>
                </ToggleGroupItem>
                <ToggleGroupItem size={size}>
                  <PencilIcon />
                  <Text className={c}>Edit</Text>
                </ToggleGroupItem>
              </ToggleGroup>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PencilIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
    </svg>
  );
}
