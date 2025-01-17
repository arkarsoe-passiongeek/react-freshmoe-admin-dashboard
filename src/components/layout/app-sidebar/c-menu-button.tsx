import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

const CMenuButton = ({ item }: any) => {
  const { pathname } = useLocation();
  const url = item.url.pathname ?? item.url;

  return (
    <SidebarMenuButton
      asChild
      isActive={pathname === url}
      className={`h-auto p-0 ${
        pathname === url ? "!bg-c-button-bg !text-c-primary" : ""
      }`}
    >
      <div>
        <Link
          className="flex items-center gap-2 w-full !text-base p-3"
          to={url}
        >
          {item.icon && <item.icon />}
          {item.title}
        </Link>
      </div>
    </SidebarMenuButton>
  );
};

export default CMenuButton;
