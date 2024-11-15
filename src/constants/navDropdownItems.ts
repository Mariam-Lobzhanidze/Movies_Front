import { User } from "../components/shared/types";

export const getDropdownItems = (activeUser: User | null, handleLogout: () => void) => [
  { label: "AdminPage", href: "/adminPage", visible: activeUser?.role === "admin" },
  {
    label: "Sign out",
    onClick: handleLogout,
  },
];
