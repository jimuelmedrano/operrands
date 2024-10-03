import { icons } from "lucide-react";

const Icon = ({
  name,
  className,
  size,
  inverted,
}: {
  name: keyof typeof icons;
  className?: string;
  size?: number;
  inverted?: boolean;
}) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      className={
        "no-transition" +
        " " +
        (inverted ? "text-white dark:text-black" : "dark:text-white") +
        " " +
        className
      }
      size={size}
    />
  );
};

export default Icon;
