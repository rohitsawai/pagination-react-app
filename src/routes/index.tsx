import { createRoute, createRouter } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import CharacterList from "../components/CharacterList";
import CharacterDetail from "../components/CharacterDetail";
import { fetchData, endpoint } from "../api";

// Detail route with loader for character details
export const characterDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/character/description/$id",
  component: CharacterDetail,
  loader: async ({ params }) => {
    return fetchData(`${endpoint}/${params.id}`);
  },
});

// Changing page route
export const changePageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/character/page/$page",
  component: CharacterList,
  loader: async ({ params }) => {
    return fetchData(`${endpoint}/?page=${params.page}`);
  },
});

// Create the router
export const router = createRouter({
  routeTree: RootRoute.addChildren([characterDetailRoute, changePageRoute]),
});
