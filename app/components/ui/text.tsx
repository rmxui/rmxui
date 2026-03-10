import { useRender } from "@base-ui/react/use-render";
import { cn } from "~/lib/utils";

export type TextProps = useRender.ComponentProps<"span">;

export function Text({ className, render, ...props }: TextProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: { className: cn("pointer-events-none", className), ...props },
    state: { slot: "text" },
  });
}

export type SupportingTextProps = useRender.ComponentProps<"span">;

export function SupportingText({
  className,
  render,
  ...props
}: SupportingTextProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: { className: cn("pointer-events-none", className), ...props },
    state: { slot: "supporting-text" },
  });
}
