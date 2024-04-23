import { Moon, Sun, Check, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle({ ...props }) {
  const { theme, setTheme } = useTheme();

  return (
    <div {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {theme === "system" ? (
              <Monitor className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            )}
            {/* <Monitor className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:scale-100" /> */}
            <span className="sr-only">toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            light
            {theme === "light" && (
              <Check className="w-3.5 h-3.5 ml-2" strokeWidth={2.5} />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            dark
            {theme === "dark" && (
              <Check className="w-3.5 h-3.5 ml-2" strokeWidth={2.5} />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            system
            {theme === "system" && (
              <Check className="w-3.5 h-3.5 ml-2" strokeWidth={2.5} />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
