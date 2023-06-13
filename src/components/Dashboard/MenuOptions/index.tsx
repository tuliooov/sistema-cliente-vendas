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

export const MainListItems = () => {
  const [selected, setSelected] = React.useState("/");

  const handleListItemClick = (href: string) => {
    setSelected(href);
  };

  const options = [
    {
      href: "/",
      icon: <DashboardIcon />,
      text: "Dashboard",
    },
    {
      href: "/orders",
      icon: <ShoppingCartIcon />,
      text: "Pedidos",
    },
    {
      href: "/clients",
      icon: <ShoppingCartIcon />,
      text: "Clientes",
    },
    {
      href: "/sellers",
      icon: <ShareIcon />,
      text: "Representantes",
    },
    {
      href: "/products",
      icon: <PeopleIcon />,
      text: "Produtos",
    },
  ];

  return (
    <>
      {options.map((option) => (
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
