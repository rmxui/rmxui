import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { capitalize } from "~/lib/utils";

const group1 = [
  {
    id: "item-1",
    leading: <VisibilityIcon />,
    trailing: <StarIcon />,
    support: null,
    sub: null,
  },
  {
    id: "item-2",
    leading: <CopyContentIcon />,
    trailing: "⌘C",
    support: null,
    sub: null,
  },
  {
    id: "divider-1",
    leading: null,
    trailing: null,
    support: null,
    sub: null,
  },
  {
    id: "item-3",
    leading: <EditIcon />,
    trailing: null,
    support: null,
    sub: [
      {
        id: "sub-item-1",
        leading: <VisibilityIcon />,
        trailing: <StarIcon />,
        support: null,
        sub: null,
      },
      {
        id: "sub-item-2",
        leading: <CopyContentIcon />,
        trailing: "⌘C",
        support: null,
        sub: null,
      },
      {
        id: "sub-item-3",
        leading: <EditIcon />,
        trailing: null,
        support: null,
        sub: null,
      },
    ],
  },
  {
    id: "item-4",
    leading: <CloudIcon />,
    trailing: null,
    support: null,
    sub: null,
  },
] as const;
const group2 = [
  { id: "item-5", leading: null, trailing: null, support: null, sub: null },
] as const;
const groups = [
  { id: "group-1", items: Array.from(group1) },
  { id: "group-2", items: Array.from(group2) },
] as const;
const variants = [
  { id: "default", type: "default", groups },
  { id: "vibrant", type: "default", groups },
  { id: "default", type: "link", groups },
  { id: "vibrant", type: "link", groups },
  { id: "default", type: "radio", groups },
  { id: "vibrant", type: "radio", groups },
  { id: "default", type: "checkbox", groups },
  { id: "vibrant", type: "checkbox", groups },
] as const;

function renderMenuContent(variant: any) {
  const content = (
    <>
      {variant.groups.map((group: any) =>
        renderGroup(variant.id, variant.type, group)
      )}
    </>
  );
  if (variant.type === "radio") {
    return (
      <DropdownMenuContent>
        <DropdownMenuRadioGroup>{content}</DropdownMenuRadioGroup>;
      </DropdownMenuContent>
    );
  }
  return <DropdownMenuContent>{content}</DropdownMenuContent>;
}

function renderGroup(variantId: any, type: any, group: any) {
  const key = variantId + type + group.id;
  return (
    <DropdownMenuGroup key={key}>
      {group.items.map((item: any) =>
        renderGroupItem(variantId, type, group.id, item)
      )}
    </DropdownMenuGroup>
  );
}
function renderGroupItem(variantId: any, type: any, groupId: any, item: any) {
  const key = variantId + type + groupId + item.id;
  if (item.id.startsWith("divider")) {
    return <DropdownMenuSeparator key={key} />;
  }
  const content = (
    <>
      {item.leading}
      {capitalize(item.id)}
      {item.trailing && (
        <DropdownMenuShortcut>{item.trailing}</DropdownMenuShortcut>
      )}
    </>
  );
  if (type === "checkbox") {
    return (
      <DropdownMenuCheckboxItem key={key}>{content}</DropdownMenuCheckboxItem>
    );
  }
  if (type === "radio") {
    return (
      <DropdownMenuRadioItem key={key} value={item.id}>
        {content}
      </DropdownMenuRadioItem>
    );
  }
  if (type === "link") {
    return (
      <DropdownMenuLinkItem key={key} render={<NavLink to={"#" + key} />}>
        {content}
      </DropdownMenuLinkItem>
    );
  }
  return <DropdownMenuItem key={key}>{content}</DropdownMenuItem>;
}

export default function DropdownMenuRoute() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4"></div>
        <div className="grid grid-cols-4 gap-4">
          {variants.map((variant) => (
            <div key={variant.id + variant.type} className="w-fit">
              <DropdownMenu variant={variant.id} modal={false}>
                <DropdownMenuTrigger render={<Button />}>
                  {capitalize(`${variant.id}-${variant.type}`)}
                </DropdownMenuTrigger>
                {renderMenuContent(variant)}
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function VisibilityIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
    </svg>
  );
}

function CopyContentIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
    </svg>
  );
}

function EditIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>
  );
}

function CheckIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}

function CloudIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z" />
    </svg>
  );
}

function StarIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentcolor"
      {...props}
    >
      <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
    </svg>
  );
}
