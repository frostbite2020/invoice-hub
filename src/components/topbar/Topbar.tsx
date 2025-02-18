"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { drawerWidth } from "@/constants/menu";
import photo from "../../../public/profile-pict.png";
import Image from "next/image";
import MessageIcon from "../../../public/message-icon";
import NotificationIcon from "../../../public/notification";
import ToggleSwitch from "../buttons/Switch";
import { Stack } from "@mui/material";
import { MoonIcon } from "@heroicons/react/24/solid";
import SunIcon from "../../../public/sun-icon";
import ArrowIcon from "../../../public/arrow-icon";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function TopBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileIsOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOn, setIsOn] = React.useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  const profileSwitch = () => {};
  return (
    <AppBar
      position="static"
      className="h-20 justify-center bg-white shadow-none"
      color="secondary"
      sx={{
        paddingLeft: `${drawerWidth}px`,
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="justify-end">
          <Stack className="flex-row justify-center items-center">
            <Stack
              onClick={toggleSwitch}
              className={`flex-row bg-[#E2E8F0] w-16 rounded-full p-1 h-[32px] mr-7 scursor-pointer transition-all duration-300 ${
                isOn ? "justify-end" : "justify-start"
              }`}
            >
              <IconButton
                className="bg-white w-6 h-6 shadow-md items-center p-1"
                aria-label="toggle theme"
              >
                {isOn ? (
                  <MoonIcon color="text-gray-500" />
                ) : (
                  <SunIcon color="text-yellow-500" />
                )}
              </IconButton>
            </Stack>
            <IconButton className="bg-[#E2E8F0] h-[32px] w-[32px] mr-[15px]">
              <NotificationIcon />
            </IconButton>
            <IconButton className="bg-[#E2E8F0] h-[32px] w-[32px] mr-[30px]">
              <MessageIcon />
              <Stack
                className="absolute top-0 right-0 bg-[#DC3545] rounded-full w-[10px] h-[10px] p-[2px]"
                style={{
                  transform: "translate(1%, -1%)", // Moves the badge slightly out of the circle to the top-right
                }}
              />
            </IconButton>
            <Stack className="space-y-0 items-end mr-[15px]">
              <Typography className="text-sm/[16px] text-[#212B36]">
                John Doe
              </Typography>
              <Typography className="text-sm/[16px] text-[#637381]">
                Verified Member
              </Typography>
            </Stack>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="mr-[10px]">
                <Image src={photo} alt="user-profile" width={46} />
              </IconButton>
            </Tooltip>

            <IconButton onClick={handleClick}>
              <ArrowIcon isOpen={profileIsOpen} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;
