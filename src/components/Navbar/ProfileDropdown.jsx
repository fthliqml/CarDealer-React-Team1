import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/AuthContext";
import apiInstance from "@/api/apiInstance";
import { Button } from "@/components/ui/button";

import UserProfile from "@/components/UserProfile/UserProfile";
import handleLogout from "@/services/logoutServices";

const ProfileDropdown = () => {
  const { setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiInstance.get("/auth/logout", {
        withCredentials: true,
      });

      const resAPI = response.data;

      if (resAPI.isSuccess) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <UserProfile>
            <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
              Profile
            </p>
          </UserProfile>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
          >
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <button
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileDropdown;
