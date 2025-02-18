"use client";

import { useState } from "react";
import { Stack, IconButton } from "@mui/material";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <Stack
      onClick={toggleSwitch}
      className={`bg-[#E2E8F0] w-16 rounded-full p-1 h-[34px] cursor-pointer transition-all duration-300 ease-in-out ${
        isOn ? "justify-end" : "justify-start"
      }`}
    >
      <IconButton
        className="bg-white w-8 h-8 shadow-md"
        aria-label="toggle theme"
      >
        {isOn ? (
          <MoonIcon color="text-gray-500" />
        ) : (
          <SunIcon color="text-yellow-500" />
        )}
      </IconButton>
    </Stack>
  );
}
