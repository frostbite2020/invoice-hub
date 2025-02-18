"use client";

import {
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { drawerWidth, SIDEBAR_MENU } from "@/constants/menu";
import MainIcon from "../../../public/main-icon";
import { Fragment } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          paddingLeft: "24px",
          paddingTop: "28px",
        },
      }}
    >
      <Container maxWidth="sm" className="flex items-center space-x-2 pl-5">
        <MainIcon color="white" />
        <Typography variant="h6" className="text-white font-bold">
          InvoiceHub
        </Typography>
      </Container>

      <List className="mt-8 pl-2">
        {SIDEBAR_MENU.map((section) => (
          <Fragment key={section.id}>
            {section.label && (
              <Typography
                variant="subtitle2"
                className="uppercase font-semibold pl-4 text-[#9d9d9d]"
              >
                {section.label}
              </Typography>
            )}
            {section.children && (
              <List>
                {section.children.map((menu) => {
                  const isActive = pathname === menu.path;

                  return (
                    <ListItemButton key={menu.id} href={menu.path}>
                      <ListItemIcon className="min-w-0 w-7">
                        {menu.icon && (
                          <menu.icon color={isActive ? "#f4f4f4" : "#9d9d9d"} />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={menu.label}
                        sx={{
                          color: isActive ? "#f4f4f4" : "#9d9d9d",
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            )}
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
}
