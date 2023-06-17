"use client";
import ShareIcon from '@mui/icons-material/Share';
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import CategoryIcon from '@mui/icons-material/Category';
import { useUser } from '@/contexts/userContext';
export const MainListItems = () => {
  const [selected, setSelected] = React.useState("/dashboard");
  const {user} = useUser()
  const handleListItemClick = (href: string) => {
    setSelected(href);
  };

  const options = [
    {
      allowed: user?.permissions?.dashboardPage?.view,
      href: "/dashboard/",
      icon: <DashboardIcon />,
      text: "Dashboard",
    },
    {
      allowed: user?.permissions?.ordersPage?.view,
      href: "/dashboard/orders",
      icon: <ShoppingCartIcon />,
      text: "Pedidos",
    },
    {
      allowed: user?.permissions?.clientsPage?.view,
      href: "/dashboard/clients",
      icon: <PeopleIcon />,
      text: "Clientes",
    },
    {
      allowed: user?.permissions?.sellersPage?.view,
      href: "/dashboard/sellers",
      icon: <ShareIcon />,
      text: "Representantes",
    },
    {
      allowed: user?.permissions?.productsPage?.view,
      href: "/dashboard/products",
      icon: <CategoryIcon />,
      text: "Produtos",
    },
  ];

  return (
    <>
      {options.filter(option => !!option.allowed).map((option) => (
        <ListItemButton
          selected={selected === option.href}
          component={Link}
          href={option.href}
          key={option.href}
          onClick={() => handleListItemClick(option.href)}
        >
          <ListItemIcon>{option.icon}</ListItemIcon>
          <ListItemText primary={option.text} />
        </ListItemButton>
      ))}
    </>
  );
};
