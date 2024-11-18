import { Disclosure } from "@headlessui/react";

import Panel from "@/components/Navbar/Panel";
import ProfileDropdown from "@/components/Navbar/ProfileDropdown";
import ShoppingCart from "@/components/Navbar/ShoppingCart";
import MobileMenuButton from "@/components/Navbar/MobileMenuButton";
import Logo from "@/components/Navbar/Logo";
import NavigationMenu from "@/components/Navbar/NavigationMenu";

const navigation = [
  { name: "Cars", href: "/cars", current: true },
  { name: "Services", href: "/services", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Feedback", href: "/register", current: false },
];

export default function Navbar() {
  return (
    <>
      <Disclosure
        as="nav"
        className="fixed top-0 left-0 w-full z-50 bg-[#16423C]"
      >
        <div className="w-full px-2 sm:px-6 lg:px-14">
          <div className="relative w-full flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <MobileMenuButton />
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Logo />
              <NavigationMenu navigation={navigation} />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ShoppingCart />
              <ProfileDropdown />
            </div>
          </div>
        </div>

        <Panel navigation={navigation} />
      </Disclosure>
    </>
  );
}
