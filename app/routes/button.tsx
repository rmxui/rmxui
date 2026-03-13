import { useMemo, useState } from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const variants = [
  "elevated",
  "filled",
  "default",
  "tonal",
  "secondary",
  "outlined",
  "outline",
  "standard",
  "ghost",
  "destructive",
] as const;
const disabledStates = [false, true];

export default function ButtonRoute() {
  const [type, setType] = useState<any>("default");
  const [shape, setShape] = useState<any>("round");

  const sizes: ButtonProps["size"][] = useMemo(() => {
    if (type === "icon") {
      return ["icon-xs", "icon-sm", "icon", "icon-md", "icon-lg", "icon-xl"];
    }
    return ["xs", "sm", "md", "lg", "xl"];
  }, [type]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            className="border outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="icon">Icon</option>
          </select>
        </div>
        <div className="flex gap-1">
          <label htmlFor="shape">Shape:</label>
          <select
            id="shape"
            className="border outline-none"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
          >
            <option value="round">Round</option>
            <option value="square">Square</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-4">
            {sizes.map((size) =>
              disabledStates.map((disabled) => (
                <Button
                  key={`${disabled ? "disabled" : "enabled"}-${size}-${variant}`}
                  variant={variant}
                  size={size}
                  shape={shape}
                  disabled={disabled}
                  className="w-fit"
                >
                  <PencilIcon />
                  <Text
                    className={cn(
                      "first-letter:uppercase",
                      type === "icon" && "sr-only"
                    )}
                  >
                    {variant}
                  </Text>
                </Button>
              ))
            )}
          </div>
        ))}
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
