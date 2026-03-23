import { useState } from "react";
import { NavLink } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Item,
  ItemActions,
  ItemCheckbox,
  ItemCheckboxIndicator,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemLink,
  ItemMedia,
  ItemRadio,
  ItemRadioGroup,
  ItemRadioIndicator,
  ItemTitle,
} from "~/components/ui/item";
import { capitalize, cn } from "~/lib/utils";

const media: Record<string, any> = {
  avatar: {
    id: "avatar",
    content: (
      <Avatar>
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    ),
  },
  video: { id: "video", content: null },
  image: { id: "image", content: null },
  icon: { id: "icon", content: <StarsIcon /> },
  checkbox: { id: "checkbox", content: <ItemCheckboxIndicator /> },
  radio: { id: "radio", content: <ItemRadioIndicator /> },
};
const action: Record<string, any> = {
  checkbox: { id: "checkbox", content: <ItemCheckboxIndicator /> },
  radio: { id: "radio", content: <ItemRadioIndicator /> },
  text: { id: "text", content: "99+" },
  multi: {
    id: "multi",
    content: (
      <>
        <Button variant="standard" size="icon-xs">
          <BookmarkIcon />
        </Button>
        <Button variant="standard" size="icon-xs">
          <MoreHorizIcon />
        </Button>
      </>
    ),
  },
};
const threeLine = (
  <>
    Supporting text
    <br />
    with extra text
  </>
);
const desc: Record<string, any> = {
  "three-line-top-aligned": threeLine,
  "three-line": threeLine,
  "two-line": "Supporting text",
};
const defaultItems: Record<string, any>[] = [
  { id: "list-item-1", media: null },
  { id: "list-item-2", media: null },
  { id: "list-item-3", media: null },
  { id: "list-item-4", media: null },
];
const selectVariants: Record<string, any>[] = [
  { id: "single-select", type: "radio", mediaId: "icon", actionId: null },
  { id: "single-select", type: "radio", mediaId: "radio", actionId: null },
  { id: "single-select", type: "radio", mediaId: "icon", actionId: "radio" },
  { id: "multi-select", type: "checkbox", mediaId: "icon", actionId: null },
  { id: "multi-select", type: "checkbox", mediaId: "checkbox", actionId: null },
  {
    id: "multi-select",
    type: "checkbox",
    mediaId: "icon",
    actionId: "checkbox",
  },
  { id: "single-action", type: "link", mediaId: "icon", actionId: "text" },
  { id: "multi-action", type: "link", mediaId: "icon", actionId: "multi" },
  { id: "non-interactive", type: "default", mediaId: "icon", actionId: "text" },
];
const actionVariants: Record<string, any>[] = [
  { id: "three-line", type: "link", mediaId: "avatar", actionId: "text" },
  { id: "two-line", type: "link", mediaId: "avatar", actionId: "text" },
  { id: "one-line", type: "link", mediaId: "avatar", actionId: "text" },
  { id: "three-line", type: "link", mediaId: "image", actionId: "text" },
  { id: "two-line", type: "link", mediaId: "image", actionId: "text" },
  { id: "one-line", type: "link", mediaId: "image", actionId: "text" },
  { id: "three-line", type: "link", mediaId: "video", actionId: "text" },
  { id: "two-line", type: "link", mediaId: "video", actionId: "text" },
  { id: "one-line", type: "link", mediaId: "video", actionId: "text" },
  { id: "three-line", type: "link", mediaId: "icon", actionId: "text" },
  { id: "two-line", type: "link", mediaId: "icon", actionId: "text" },
  { id: "one-line", type: "link", mediaId: "icon", actionId: "text" },
  { id: "three-line", type: "link", mediaId: "text", actionId: "text" },
  { id: "two-line", type: "link", mediaId: "text", actionId: "text" },
  { id: "one-line", type: "link", mediaId: "text", actionId: "text" },
  { id: "three-line", type: "checkbox", mediaId: "checkbox", actionId: null },
  { id: "two-line", type: "checkbox", mediaId: "checkbox", actionId: null },
  { id: "one-line", type: "checkbox", mediaId: "checkbox", actionId: null },
  { id: "three-line", type: "checkbox", mediaId: "text", actionId: "checkbox" },
  { id: "two-line", type: "checkbox", mediaId: "text", actionId: "checkbox" },
  { id: "one-line", type: "checkbox", mediaId: "text", actionId: "checkbox" },
  { id: "three-line", type: "radio", mediaId: "radio", actionId: null },
  { id: "two-line", type: "radio", mediaId: "radio", actionId: null },
  { id: "one-line", type: "radio", mediaId: "radio", actionId: null },
  { id: "three-line", type: "radio", mediaId: "text", actionId: "radio" },
  { id: "two-line", type: "radio", mediaId: "text", actionId: "radio" },
  { id: "one-line", type: "radio", mediaId: "text", actionId: "radio" },
];
function getItems(variant: Record<string, any>) {
  const items = [];
  const arr = Array.from(defaultItems);
  if (variant.id.endsWith("line")) {
    return [
      {
        ...arr[0],
        type: variant.type,
        media: { ...media[variant.mediaId] },
        actions: { ...action[variant.actionId] },
        desc: desc[variant.id],
      },
    ];
  }
  for (const item of arr) {
    items.push({
      ...item,
      type: variant.type,
      media: { ...media[variant.mediaId] },
      actions: { ...action[variant.actionId] },
      desc: desc[variant.id],
    });
  }
  return items;
}

function getTitle(variant: Record<string, any>) {
  const { id, type, mediaId, actionId } = variant;
  if (id.endsWith("line")) {
    const action = actionId ? `trailing-${actionId}` : "";
    return `leading-${mediaId}-${action}`;
  }
  return variant.id;
}
function renderGroup(
  variant: Record<string, any>,
  isSegmented = false,
  isDisabled = false
) {
  if (variant.id === null) return <div></div>;

  const key = variant.id + variant.type + variant.mediaId + variant.actionId;
  const align = variant.id === "three-line" ? "top" : undefined;
  const items = getItems(variant);
  const content =
    variant.type === "radio" ? (
      <ItemRadioGroup
        align={align}
        disabled={isDisabled}
        segmented={isSegmented}
        defaultValue="list-item-2"
      >
        {items.map(renderItem)}
      </ItemRadioGroup>
    ) : (
      <ItemGroup align={align} disabled={isDisabled} segmented={isSegmented}>
        {items.map(renderItem)}
      </ItemGroup>
    );
  return (
    <div key={key}>
      <div>{capitalize(getTitle(variant))}</div>
      <div>{content}</div>
    </div>
  );
}
function renderItem(item: Record<string, any>) {
  const key = item.type + item.id;
  const content = (
    <>
      {item.media?.id && (
        <ItemMedia
          variant={item.media.id}
          className={cn(
            (item.media.id === "video" || item.media.id === "image") &&
              "bg-tertiary"
          )}
        >
          {item.media.content}
        </ItemMedia>
      )}
      <ItemContent>
        <ItemTitle>{capitalize(item.id)}</ItemTitle>
        {item.desc && <ItemDescription>{item.desc}</ItemDescription>}
      </ItemContent>
      {item.actions && <ItemActions>{item.actions.content}</ItemActions>}
    </>
  );

  if (item.type === "radio") {
    return (
      <ItemRadio key={key} value={item.id}>
        {content}
      </ItemRadio>
    );
  }
  if (item.type === "checkbox") {
    return (
      <ItemCheckbox key={key} defaultChecked={item.id === "list-item-2"}>
        {content}
      </ItemCheckbox>
    );
  }
  if (item.type === "link") {
    return (
      <ItemLink key={key} render={<NavLink to={"#" + key} />}>
        {content}
      </ItemLink>
    );
  }
  return <Item key={key}>{content}</Item>;
}
export default function ItemRoute() {
  const [variant, setVariant] = useState<any>("segmented");
  const [disabled, setDisabled] = useState<any>("false");

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
        <div className="flex gap-1">
          <label htmlFor="disabled">Disabled:</label>
          <select
            id="disabled"
            className="border outline-none"
            value={disabled}
            onChange={(e) => setDisabled(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {selectVariants.map((value) =>
          renderGroup(value, variant === "segmented", disabled === "true")
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {actionVariants.map((value) =>
          renderGroup(value, variant === "segmented", disabled === "true")
        )}
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
