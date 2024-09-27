import { icons } from "lucide-react";
const Icon = ({
  name,
  className,
  size,
}: {
  name: keyof typeof icons;
  className?: string;
  size?: number;
}) => {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      className={"text-black dark:text-white no-transition " + className}
      size={size}
    />
  );
};

export default Icon;
