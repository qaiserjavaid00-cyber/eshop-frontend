
// import React from "react";
// import { NavLink } from "react-router-dom";

// export const AdminSidebar = () => {

//     const baseClass =
//         "border-b-2 py-2 transition-all duration-200 hover:scale-105 hover:border-orange-700 hover:text-orange-700";

//     const activeClass = "text-orange-600 border-orange-600";

//     return (
//         <div className="w-60 mt-3 min-h-screen rounded-lg p-4 shadow-lg flex">
//             <ul className="flex flex-col gap-6 font-bold fixed">

//                 <li>
//                     <NavLink
//                         to="dash"
//                         className={({ isActive }) =>
//                             `text-2xl ${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Dashboard
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="orders"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Orders
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="product"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Product
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="products"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Products
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="cat"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Category
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="sub-cat"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Sub Category
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="cpn"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Coupons
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="password"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Password
//                     </NavLink>
//                 </li>

//                 <li>
//                     <NavLink
//                         to="profile"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Profile
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         to="hero"
//                         className={({ isActive }) =>
//                             `${baseClass} ${isActive ? activeClass : "text-black"}`
//                         }
//                     >
//                         Hero
//                     </NavLink>
//                 </li>

//             </ul>
//         </div>
//     );
// };

import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const AdminSidebar = () => {

    const baseClass =
        "border-b-2 py-2 transition-all duration-200 hover:scale-105 hover:border-orange-700 hover:text-orange-700";

    const activeClass = "text-orange-600 border-orange-600";

    const SidebarLinks = () => (
        <ul className="flex flex-col gap-6 font-bold">
            <li>
                <NavLink
                    to="dash"
                    className={({ isActive }) =>
                        `text-2xl ${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Dashboard
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Orders
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="product"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Product
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="products"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Products
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="cat"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Category
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="sub-cat"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Sub Category
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="cpn"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Coupons
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="password"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Password
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Profile
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="hero"
                    className={({ isActive }) =>
                        `${baseClass} ${isActive ? activeClass : "text-black"}`
                    }
                >
                    Hero
                </NavLink>
            </li>
        </ul>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-60 mt-3 min-h-screen rounded-lg p-4 shadow-lg">
                <SidebarLinks />
            </div>

            {/* Mobile + Tablet Sheet */}
            <div className="lg:hidden p-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-64">
                        <SidebarLinks />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};