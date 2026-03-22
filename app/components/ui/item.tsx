import { Checkbox, Radio, RadioGroup } from "@base-ui/react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { FocusRing } from "~/components/ui/focus-ring";
import { Ripple } from "~/components/ui/ripple";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

type ItemGroupContextState = Pick<
  VariantProps<typeof itemGroup>,
  "align" | "mode"
> &
  Pick<RadioGroup.Props, "disabled">;

const ItemGroupContext = createContext<ItemGroupContextState | null>(null);

function useItemGroup() {
  const context = useContext(ItemGroupContext);
  return context;
}

const itemGroup = cva(
  "group/group flex flex-col rounded-[16px] data-disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: null,
        segmented: "gap-[2px]",
      },
      mode: {
        "single-action": null,
        "multi-action": null,
        "single-select": null,
        "multi-select": null,
        "non-interactive": null,
      },
      align: {
        middle: null,
        top: null,
      },
    },
    defaultVariants: {
      variant: "default",
      mode: "single-action",
      align: "middle",
    },
  }
);

type ItemGroupProps = (useRender.ComponentProps<"div"> | RadioGroup.Props) &
  VariantProps<typeof itemGroup> &
  Pick<RadioGroup.Props, "disabled">;

function ItemGroup({
  align = "middle",
  className,
  disabled,
  mode = "single-action",
  render,
  variant = "default",
  ...groupProps
}: ItemGroupProps) {
  const props = mergeProps(
    {
      role: "list",
      disabled,
      className: cn(itemGroup({ variant }), className),
    },
    groupProps
  );

  return (
    <ItemGroupContext value={{ align, disabled, mode }}>
      {mode === "single-select" ? (
        <RadioGroup
          data-slot="item-group"
          data-mode={mode}
          data-variant={variant}
          render={render}
          {...props}
        />
      ) : (
        useRender({
          defaultTagName: "div",
          render: render as useRender.RenderProp,
          props,
          state: { slot: "item-group", disabled, mode, variant },
        })
      )}
    </ItemGroupContext>
  );
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-2", className)}
      {...props}
    />
  );
}

const item = cva([
  "group/item relative flex gap-[12px] rounded-[4px] border-none ripple-on-surface bg-surface px-[16px] py-[10px] outline-none",
  "first:rounded-t-[16px] last-of-type:rounded-b-[16px] hover:rounded-[12px] not-hover:focus-visible:rounded-[16px] active:rounded-[16px]",
  "focus-visible:*:data-[slot=focus-ring]:-outline-offset-3 focus-visible:*:data-[slot=focus-ring]:outline-solid",
  "data-non-interactive:pointer-events-none data-checked:rounded-[16px] data-checked:bg-primary-container",
  "data-disabled:bg-on-surface/10 data-disabled:data-checked:bg-on-surface/38",
]);

type ItemProps = (
  | useRender.ComponentProps<"div">
  | Checkbox.Root.Props
  | Radio.Root.Props
) &
  Pick<ItemGroupContextState, "align" | "disabled"> &
  VariantProps<typeof item>;

function Item({
  align: alignProp,
  children,
  className,
  disabled: disabledProp,
  render,
  ...itemProps
}: ItemProps) {
  const group = useItemGroup();
  const align = group?.align || alignProp;
  const disabled = group?.disabled || disabledProp;
  const defaultProps = {
    disabled,
    className: cn(item(), className),
    children: (
      <>
        <FocusRing />
        <Ripple />
        {children}
      </>
    ),
  };

  const props = mergeProps(defaultProps, itemProps);
  if (group?.mode === "multi-select") {
    return (
      <Checkbox.Root
        data-slot="item"
        data-align={align}
        {...(props as Checkbox.Root.Props)}
      />
    );
  }

  if (group?.mode === "single-select") {
    return (
      <Radio.Root
        data-slot="item"
        render={(p, s) =>
          useRender({
            defaultTagName: "div",
            render: render as useRender.RenderProp,
            props: { ...p, tabIndex: s.disabled ? -1 : p.tabIndex },
            state: { ...s, align },
          })
        }
        {...(props as Radio.Root.Props)}
      />
    );
  }

  return useRender({
    defaultTagName: "div",
    render: render as useRender.RenderProp,
    props: { ...props, tabIndex: disabled ? -1 : 0 },
    state: {
      slot: "item",
      align,
      disabled,
      "non-interactive": group?.mode === "non-interactive",
    },
  });
}

const itemMedia = cva(
  "flex shrink-0 items-center justify-center group-data-[align=top]/item:items-start group-data-checked/item:text-on-primary-container group-data-disabled/item:text-on-surface/38",
  {
    variants: {
      variant: {
        avatar:
          "size-[40px] bg-primary-container text-[16px]/[24px] font-[500] tracking-[0.15px] text-on-primary-container",
        checkbox: null, //"*:data-[slot=checkbox-indicator]:*:[svg]:size-[20px]",
        icon: "p-[2px] text-on-surface-variant *:[svg]:pointer-events-none *:[svg]:size-[20px]",
        image: "aspect-square size-[56px] rounded-[8px] *:[svg]:size-[56px]",
        radio: null, //"*:data-[slot=radio-indicator]:*:[svg]:size-[20px]",
        switch: null,
        video: "rounded-[8px]",
      },
      size: {
        default: null,
        lg: null,
      },
    },
    compoundVariants: [
      { size: "default", variant: "video", class: "h-[56px] w-[100px]" },
      { size: "lg", variant: "video", class: "h-[64px] w-[114px]" },
    ],
    defaultVariants: {
      variant: "icon",
      size: "default",
    },
  }
);

function ItemMedia({
  className,
  size = "default",
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMedia>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMedia({ variant, size }), className)}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex grow flex-col justify-center group-data-[align=top]/item:justify-start",
        className
      )}
      {...props}
    />
  );
}

function ItemOverline({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-overline"
      className={cn(
        "text-[11px]/[16px] font-[500] tracking-[0.5px] text-on-surface-variant",
        "group-data-checked/item:text-on-primary-container group-data-disabled/item:text-on-surface/38",
        className
      )}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "text-[16px]/[24px] font-[400] tracking-[0.5px] text-on-surface",
        "group-data-checked/item:text-on-primary-container group-data-disabled/item:text-on-surface/38",
        className
      )}
      {...props}
    />
  );
}

type ItemDescriptionProps = React.ComponentProps<"p">;

function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-[14px]/[20px] font-[400] tracking-[0.25px] text-on-surface-variant",
        "group-data-checked/item:text-on-primary-container group-data-disabled/item:text-on-surface/38",
        className
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn(
        "flex shrink-0 items-center text-[11px]/[16px] font-[500] tracking-[0.5px] text-on-surface-variant *:[svg]:pointer-events-none *:[svg]:size-[20px]",
        "group-data-[align=top]/item:items-start group-data-checked/item:text-on-primary-container group-data-disabled/item:text-on-surface/38",
        className
      )}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemOverline,
  ItemSeparator,
  ItemTitle,
};
