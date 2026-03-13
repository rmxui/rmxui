import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import { Text } from "~/components/ui/text";

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

export default function ButtonGroupRoute() {
  const [shape, setShape] = useState<any>("round");
  const [variant, setVariant] = useState<any>("standard");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          <label htmlFor="variant">Variant:</label>
          <select
            id="variant"
            className="border outline-none"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="split">Split</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center gap-4">
          {sizes.map((size) => {
            const s = size.replace("icon-", "") as any;
            const c = size.startsWith("icon") ? "sr-only" : undefined;
            if (variant === "standard") {
              return (
                <ButtonGroup key={size} size={s}>
                  <Button size={size} shape={shape}>
                    <PencilIcon />
                    <Text className={c}>Edit</Text>
                  </Button>
                  <Button size={size} shape={shape}>
                    <PencilIcon />
                    <Text className={c}>Edit</Text>
                  </Button>
                  <Button size={size} shape={shape}>
                    <PencilIcon />
                    <Text className={c}>Edit</Text>
                  </Button>
                  <Button size={size} shape={shape}>
                    <PencilIcon />
                    <Text className={c}>Edit</Text>
                  </Button>
                </ButtonGroup>
              );
            }
            return (
              <ButtonGroup key={size} variant={variant} size={s}>
                <Button size={size} shape={shape}>
                  <PencilIcon />
                  <Text className={c}>Edit</Text>
                </Button>
                <Button size={`icon-${s}` as any} shape={shape}>
                  <KeyboardArrowDownIcon />
                  <Text className="sr-only">Dropdown</Text>
                </Button>
              </ButtonGroup>
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

function KeyboardArrowDownIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
    >
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
}
