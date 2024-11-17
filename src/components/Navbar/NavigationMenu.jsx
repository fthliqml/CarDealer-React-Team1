import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavigationMenu = ({ navigation }) => {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            aria-current={item.current ? "page" : undefined}
            className={classNames(
              item.current
                ? "bg-[#5e8979] text-white"
                : "text-white hover:bg-[#5e8979] hover:rounded-full",
              "rounded-full px-3 py-2 text-sm font-medium"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
