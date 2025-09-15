import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("button", "routes/button.tsx"),
    route("icon-button", "routes/icon-button.tsx"),
    route("fab", "routes/fab.tsx"),
    route("checkbox", "routes/checkbox.tsx"),
  ]),
] satisfies RouteConfig;
