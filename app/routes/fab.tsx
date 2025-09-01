import { Fragment } from "react";
import { Fab } from "~/components/ui/fab";
import { EditIcon } from "~/icons";

const sizes = ["sm", "md", "lg"] as const;
const colors = ["primary", "secondary", "tertiary"] as const;

export default function ButtonRoute() {
  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-wrap gap-[16px]">
          {colors.map((color) => (
            <div
              key={color}
              className="flex flex-col justify-center gap-[12px]"
            >
              {sizes.map((size) => (
                <div key={size}>
                  <Fab
                    size={size}
                    color={color}
                    icon={<EditIcon />}
                    label={size + color}
                    className="*:first-letter:uppercase"
                  ></Fab>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-[16px]">
          {colors.map((color) => (
            <div
              key={color}
              className="flex flex-col justify-center gap-[12px]"
            >
              {sizes.map((size) => (
                <div key={size}>
                  <Fab
                    size={size}
                    color={color}
                    container={false}
                    icon={<EditIcon />}
                    label={size + color}
                    className="*:first-letter:uppercase"
                  ></Fab>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-[16px]">
          {colors.map((color) => (
            <div
              key={color}
              className="flex flex-col justify-center gap-[12px]"
            >
              {sizes.map((size) => (
                <Fragment key={size}>
                  <div className="flex items-center gap-[8px]">
                    <Fab
                      size={size}
                      color={color}
                      extended
                      icon={<EditIcon />}
                      label={size + color}
                      className="*:first-letter:uppercase"
                    ></Fab>
                    <Fab
                      size={size}
                      color={color}
                      extended
                      label={size + color}
                      className="*:first-letter:uppercase"
                    ></Fab>
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-[16px]">
          {colors.map((color) => (
            <div
              key={color}
              className="flex flex-col justify-center gap-[12px]"
            >
              {sizes.map((size) => (
                <Fragment key={size}>
                  <div className="flex items-center gap-[8px]">
                    <Fab
                      size={size}
                      color={color}
                      container={false}
                      extended
                      icon={<EditIcon />}
                      label={size + color}
                      className="*:first-letter:uppercase"
                    ></Fab>
                    <Fab
                      size={size}
                      color={color}
                      container={false}
                      extended
                      label={size + color}
                      className="*:first-letter:uppercase"
                    ></Fab>
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
