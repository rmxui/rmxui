import { Button } from "~/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarHeaderAction,
  SidebarHeaderTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarPanel,
  SidebarTrigger,
} from "~/components/ui/sidebar"

const types = ["items", "menu", "fab", "menu-fab"] as const

export default function SidebarRoute() {
  return (
    <div className="flex flex-wrap gap-4">
      {["standard", "modal"].map((variant) =>
        types.map((type) => (
          <Sidebar variant={variant as any} key={variant + type}>
            {variant === "modal" && (
              <SidebarTrigger render={<Button />}>Open {type}</SidebarTrigger>
            )}
            <SidebarPanel>
              <SidebarContent>
                {(type.startsWith("menu") || type.endsWith("fab")) && (
                  <SidebarHeader>
                    {type.startsWith("menu") && <SidebarHeaderTrigger />}
                    {type.endsWith("fab") && (
                      <SidebarHeaderAction icon={PencilIcon} label="Edit" />
                    )}
                  </SidebarHeader>
                )}
                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuItem icon={StarsIcon} label="Label" />
                    <SidebarMenuItem icon={StarsIcon} label="Label" isActive />
                    <SidebarMenuItem icon={StarsIcon} label="Label" isActive />
                    <SidebarMenuItem icon={StarsIcon} label="Label" />
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </SidebarPanel>
          </Sidebar>
        ))
      )}
    </div>
  )
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
  )
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
  )
}
