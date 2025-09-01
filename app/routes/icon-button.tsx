import { useState } from "react";
import { IconButton, type IconButtonProps } from "~/components/ui/icon-button";
import { EditIcon, EditIconFill } from "~/icons";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const colors = ["filled", "tonal", "outlined", "standard"] as const;
const widths = ["narrow", "default", "wide"] as const;

type State = {
  shape: IconButtonProps["shape"];
  toggle: boolean;
  disabled: boolean;
};

export default function ButtonRoute() {
  const [state, setState] = useState<State>({
    shape: "round",
    toggle: false,
    disabled: false,
  });

  function handleChangeShape(e: React.ChangeEvent) {
    const t = e.target as HTMLSelectElement;
    setState({ ...state, shape: t.value as any });
  }

  function handleChangeToggle(e: React.ChangeEvent) {
    const t = e.target as HTMLSelectElement;
    setState({ ...state, toggle: t.value === "yes" });
  }

  function handleChangeDisabled(e: React.ChangeEvent) {
    const t = e.target as HTMLSelectElement;
    setState({ ...state, disabled: t.value === "yes" });
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
            <label htmlFor="toggle">Toggle:</label>{" "}
            <select className="border-2 p-1" onChange={handleChangeToggle}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div>
            <label htmlFor="disabled">Disabled:</label>{" "}
            <select className="border-2 p-1" onChange={handleChangeDisabled}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
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
                <div key={size} className="flex gap-[8px]">
                  {widths.map((width) => (
                    <div key={width}>
                      <IconButton
                        label={size + state.shape + color + width}
                        size={size}
                        shape={state.shape}
                        color={color}
                        width={width}
                        icon={
                          state.toggle ? (
                            { off: <EditIcon />, on: <EditIconFill /> }
                          ) : (
                            <EditIcon />
                          )
                        }
                        toggle={state.toggle}
                        disabled={state.disabled}
                        className="*:first-letter:uppercase"
                      ></IconButton>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
