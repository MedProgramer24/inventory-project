import React from "react";
import {  NavLink } from "react-router-dom";

import { FaBlog,  } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";

import { LuShoppingBag } from "react-icons/lu";
import { SiBrandfolder } from "react-icons/si";

import {  BiLocationPlus, BiUser } from "react-icons/bi";
import LogoutButton from "./LogoutButton";

function SideNavbar() {
  const quickLinks = {
    title: "QUICK LINKS",
    links: [
      { link: "", name: "Dashboard", icon: <IoMdHome />, end: true },
      {
        link: "/products/new",
        name: "New Product",
        icon: <AiFillProduct />,
        end: true,
      },
      {
        link: "/brands/new",
        name: "New Brand",
        icon: <FaBlog />,
        end: true,
      },
      {
        link: "/locations/new",
        name: "New Location",
        icon: <BiLocationPlus />,
        end: true,
      },
    ],
  };
  const catalogLinks = {
    title: "CATALOG",
    links: [
      {
        link: "/products",
        name: "Products",
        icon: <LuShoppingBag />,
        end: false,
      },
      { link: "/brands", name: "Brands", icon: <SiBrandfolder />, end: false },
      {
        link: "/locations",
        name: "Locations",
        icon: <BiLocationPlus />,
        end: false,
      },
      { link: "/users", name: "User Management", icon: <BiUser />, end: false },
    ],
  };

  const links = [quickLinks, catalogLinks];
  return (
    <div className="h-full bg-[#1f2937] flex flex-col pt-6 pr-1 overflow-y-scroll  scrollbar scroll-smooth ">
      {links.map((link, index) => (
        <div key={index} className="my-6">
          <h3 className="px-4 text-sm font-semibold text-white">
            {link.title}
          </h3>
          <div className="flex flex-col flex-grow gap-1 mt-2">
            {link.links.map((_link, idx) => (
              <NavLink
                end={_link.end}
                key={idx}
                to={_link.link}
                className={(prop) =>
                  `${
                    prop.isActive
                      ? "text-teal-600 border-l-4 border-l-teal-600 rounded-sm bg-slate-50"
                      : "hover:bg-slate-50 text-white hover:text-teal-800"
                  } pl-6 py-2 font-semibold flex items-center gap-3`
                }
              >
                {_link.icon}
                <span>{_link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}

      <LogoutButton />
    </div>
  );
}

export default SideNavbar;

