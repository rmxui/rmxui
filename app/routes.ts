import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export const routes = [
  "badge",
  "button",
  "button-group",
  "card",
  "checkbox",
  "dialog",
  "dropdown-menu",
  "item",
  "radio",
  "toggle",
  "toggle-group",
]

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    ...routes.map((value) => route(value, `routes/${value}.tsx`)),
  ]),
] satisfies RouteConfig
