"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  MoonStarIcon,
  SunIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // set default theme to light if not already set
    if (!theme || theme === "system") {
      setTheme("light");
    }
  }, [setTheme, theme]);

  // don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="h-fit w-fit p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={handleThemeChange}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonStarIcon className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          Switch to {theme === "dark" ? "light" : "dark"} mode
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeSwitch;
