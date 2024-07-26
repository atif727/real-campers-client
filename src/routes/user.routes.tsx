import { ReactNode } from "react";
import Shop from "../pages/shop/Shop";
import { NavLink } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TSidebarItem = {
  key: string;
  label: ReactNode;
};

const userPaths = [
  {
    name: "Home",
    path: "home",
    element: <Home />,
  },
  {
    name: "Shop",
    path: "shop",
    element: <Shop />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
];

export const userSidebarItems = userPaths.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
      });
    }
    return acc;
  },
  []
);

export const userRoutes = userPaths.reduce((acc: TRoute[], item) => {
    acc.push({
      path: item.path,
      element: item.element,
    });

  return acc;
}, []);
