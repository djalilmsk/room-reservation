import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";

const themes = ["system", "light", "dark"];

const icons = {
  system: <Monitor className="size-4" />,
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
};

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme || "system";

  const handleClick = (value) => {
    if (themes.includes(value)) {
      setTheme(value);
    }
  };

  return (
    <div className="z-10 space-y-3">
      <h2 className="text-sm font-semibold">Theme</h2>
      <div className="flex w-fit cursor-pointer z-10 gap-5 sm:flex-col sm:gap-3">
        {themes.map((mode) => (
          <button
            key={mode}
            onClick={() => handleClick(mode)}
            className={`-ml-2 flex items-center justify-start gap-2 rounded-lg p-2 text-sm ${currentTheme === mode ? "text-primary bg-secondary font-semibold" : "text-secondary-foreground"}`}
            aria-label={`Switch to ${mode} theme`}
          >
            {icons[mode]}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
