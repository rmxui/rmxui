import { Badge, BadgeText } from "~/components/ui/badge";

const variants = [
  "default",
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
  "elevated",
  "filled",
  "tonal",
  "outlined",
] as const;

export default function BadgeRoute() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4"></div>
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-1">
            <Badge variant={variant} size="sm" />
            <Badge variant={variant}>
              <BadgeText>1</BadgeText>
            </Badge>
            <Badge variant={variant}>
              <BadgeText>99</BadgeText>
            </Badge>
            <Badge variant={variant}>
              <BadgeText>999+</BadgeText>
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
