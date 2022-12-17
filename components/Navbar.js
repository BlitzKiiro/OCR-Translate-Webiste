import {
  LanguageIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { Dropdown } from "flowbite-react";
import useThemeContext from "../hooks/useThemeContext";

const Navbar = () => {
  const { theme, dispatch } = useThemeContext();

  const ThemeIcon = () => {
    switch (theme.mode) {
      case "light":
        return <SunIcon className='w-4 h-4' />;
      case "dark":
        return <MoonIcon className='w-4 h-4' />;
      default:
        return <ComputerDesktopIcon className='w-4 h-4' />;
    }
  };

  return (
    <div className='grid grid-cols-4 items-center mb-12 pt-5 px-10 md:pt-8 md:px-36'>
      {/* logo */}
      <div className='col-span-3 md:col-span-2'>
        <p className='md:text-xl font-semibold inline-block'>
          Online Image Translate
        </p>
        <LanguageIcon className='w-6 h-6 inline-block m-2' />
      </div>
      {/* change theme drop down */}
      <div className='col-span-1 flex justify-end md:col-span-2'>
        <Dropdown label={<ThemeIcon />} arrowIcon={false} color={"gray"}>
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: "LIGHT" });
            }}
            icon={SunIcon}
          >
            Light{" "}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: "DARK" });
            }}
            icon={MoonIcon}
          >
            Dark
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: "SYSTEM" });
            }}
            icon={ComputerDesktopIcon}
          >
            System
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
