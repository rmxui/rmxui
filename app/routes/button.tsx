import { useState } from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { EditIcon, KeyboardArrowDown } from "~/icons";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const colors = ["elevated", "filled", "tonal", "outlined", "text"] as const;

function getIcon(icon: State["icon"]) {
  if (icon === "leading") return <EditIcon />;
  if (icon === "trailing") return <KeyboardArrowDown />;
  return null;
}

type State = {
  shape: ButtonProps["shape"];
  icon: "none" | "leading" | "trailing";
};

export default function ButtonRoute() {
  const [state, setState] = useState<State>({ shape: "round", icon: "none" });

  function handleChangeShape(e: React.ChangeEvent) {
    const t = e.target as HTMLSelectElement;
    setState({ ...state, shape: t.value as any });
  }

  function handleChangeIcon(e: React.ChangeEvent) {
    const t = e.target as HTMLSelectElement;
    setState({ ...state, icon: t.value as any });
  }

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[8px]">
          <div>
            <label htmlFor="shape">Shape:</label>{" "}
            <select className="border-2 p-1" onChange={handleChangeShape}>
              <option value="round">Round</option>
              <option value="square">Square</option>
            </select>
          </div>
          <div>
            <label htmlFor="icon">Icon:</label>{" "}
            <select className="border-2 p-1" onChange={handleChangeIcon}>
              <option value="none">None</option>
              <option value="leading">Leading</option>
              <option value="trailing">Trailing</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-[16px]">
          {colors.map((color) => (
            <div
              key={color}
              className="flex flex-col items-center justify-center gap-[12px]"
            >
              {sizes.map((size) => (
                <div key={size}>
                  <Button
                    size={size}
                    shape={state.shape}
                    color={color}
                    icon={getIcon(state.icon)}
                    trailingIcon={state.icon === "trailing"}
                    className="*:first-letter:uppercase"
                  >
                    {color} button
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
