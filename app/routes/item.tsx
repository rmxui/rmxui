import { Fragment, useState } from "react";
import { Button } from "~/components/ui/button";
import { CheckboxIndicator } from "~/components/ui/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "~/components/ui/item";
import { RadioIndicator } from "~/components/ui/radio-group";
import { capitalize, cn } from "~/lib/utils";

const actionModes = [
  "single-action",
  "multi-action",
  "non-interactive",
] as const;
const selectModes = [
  { id: "single-select", trailing: false },
  { id: "single-select", trailing: true },
  { id: "multi-select", trailing: false },
  { id: "multi-select", trailing: true },
] as const;
const items = [
  "list-item-1",
  "list-item-2",
  "list-item-3",
  "list-item-4",
] as const;
const medias = [
  // "avatar"
  "image",
  "video",
  "icon",
  "checkbox",
  "radio",
  "text",
] as const;
const contents = [
  {
    id: 3,
    title: "List item",
    desc: "Supporting text that is long enough to fill multiple lines",
  },
  {
    id: 2,
    title: "List item",
    desc: "Supporting text",
  },
  {
    id: 1,
    title: "List item",
  },
];
const disabledStates = [false, true];

export default function ItemRoute() {
  const [variant, setVariant] = useState<any>("segmented");

  function getItemMedia(mode?: any) {
    if (mode === "multi-select") {
      return (
        <ItemMedia variant="checkbox">
          <CheckboxIndicator />
        </ItemMedia>
      );
    }
    if (mode === "single-select") {
      return (
        <ItemMedia variant="radio">
          <RadioIndicator />
        </ItemMedia>
      );
    }
    return (
      <ItemMedia variant="icon">
        <StarsIcon />
      </ItemMedia>
    );
  }

  function getItemContent(item?: any) {
    return (
      <ItemContent>
        <ItemTitle>{capitalize(item)}</ItemTitle>
      </ItemContent>
    );
  }

  function getItemActions(mode?: any, showSelect = false) {
    if (mode === "multi-action") {
      return (
        <ItemActions>
          <Button
            variant="standard"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BookmarkIcon />
          </Button>
          <Button
            variant="standard"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreHorizIcon />
          </Button>
        </ItemActions>
      );
    }
    if (mode === "multi-select" && showSelect) {
      return (
        <ItemActions>
          <CheckboxIndicator />
        </ItemActions>
      );
    }
    if (mode === "single-select" && showSelect) {
      return (
        <ItemActions>
          <RadioIndicator />
        </ItemActions>
      );
    }
    if (mode === "non-interactive") {
      return <ItemActions>100</ItemActions>;
    }
    return null;
  }

  return (
    <div className="flex flex-col gap-4 bg-surface-dim p-2">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          <label htmlFor="variant">Variant:</label>
          <select
            id="variant"
            className="border outline-none"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="segmented">Segmented</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {medias.map((media) => (
          <div key={media}>
            <div>Leading {capitalize(media)}</div>
            <div className="flex flex-col gap-4">
              {contents.map((content) => (
                <ItemGroup
                  key={content.id}
                  align={content.id === 3 ? "top" : "middle"}
                  mode={
                    (
                      {
                        checkbox: "multi-select",
                        radio: "single-select",
                      } as any
                    )[media]
                  }
                >
                  <Item
                    value={
                      ({ checkbox: content.id, radio: content.id } as any)[
                        media
                      ]
                    }
                  >
                    <ItemMedia
                      variant={media as any}
                      className={cn({
                        hidden: media === "text",
                        "bg-tertiary": media === "image" || media === "video",
                      })}
                    >
                      {media === "checkbox" && <CheckboxIndicator />}
                      {media === "radio" && <RadioIndicator />}
                      {media === "icon" && <StarsIcon />}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{content.title}</ItemTitle>
                      {content.desc && (
                        <ItemDescription>{content.desc}</ItemDescription>
                      )}
                    </ItemContent>
                  </Item>
                </ItemGroup>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {disabledStates.map((disabled) => (
          <Fragment key={disabled ? "disabled" : "endabled"}>
            {selectModes.map((mode) => (
              <div>
                <div>{capitalize(mode.id)}</div>
                <ItemGroup
                  variant={variant}
                  mode={mode.id}
                  disabled={disabled}
                  value={
                    disabled && mode.id === "single-select"
                      ? "list-item-2"
                      : undefined
                  }
                >
                  {items.map((item) => {
                    return (
                      <Item
                        key={item}
                        value={item}
                        defaultChecked={
                          disabled && mode.id === "multi-select"
                            ? item === "list-item-3"
                            : undefined
                        }
                      >
                        {getItemMedia()}
                        {getItemContent(item)}
                        {getItemActions(mode.id, mode.trailing)}
                      </Item>
                    );
                  })}
                </ItemGroup>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {actionModes.map((mode) => (
          <div key={mode}>
            <div>{capitalize(mode)}</div>
            <ItemGroup variant={variant} mode={mode}>
              {items.map((item) => {
                return (
                  <Item
                    key={item}
                    value={mode.includes("select") ? item : undefined}
                  >
                    {getItemMedia()}
                    {getItemContent(item)}
                    {getItemActions(mode)}
                  </Item>
                );
              })}
            </ItemGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookmarkIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
    </svg>
  );
}

function MoreHorizIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
    </svg>
  );
}

function StarsIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="m320-240 160-122 160 122-60-198 160-114H544l-64-208-64 208H220l160 114-60 198ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
}
