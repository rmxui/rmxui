import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("button", "routes/button.tsx"),
    route("button-group", "routes/button-group.tsx"),
    route("card", "routes/card.tsx"),
    route("toggle", "routes/toggle.tsx"),
    route("toggle-group", "routes/toggle-group.tsx"),
  ]),
] satisfies RouteConfig;
