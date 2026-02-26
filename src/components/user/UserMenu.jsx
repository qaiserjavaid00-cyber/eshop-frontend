import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, ShoppingCart, Settings2, User2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/redux/userSlice"; // replace with your actual logout action
import { loginOutAPI } from "@/Api/userApi";


export default function UserMenu() {
    const profile = useSelector((state) => state.user.profile)
    const status = useSelector((state) => state.user.status)
    const auth = status === "authenticated"
    const admin = profile?.isAdmin === true
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await loginOutAPI()
        dispatch(resetUser())
        navigate("/login")
    };

    return (
        <>
            {
                auth ? (<DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild>
                            <Link to="/user/profile">
                                <Settings className="mr-2 h-4 w-4 cursor-pointer" /> {profile?.name}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            {admin ? (<Link to="/admin/dash">
                                <Settings2 className="mr-2 h-4 w-4 cursor-pointer" /> Admin Dashboard
                            </Link>)
                                :
                                (<Link to="/user/dashboard">
                                    <ShoppingCart className="mr-2 h-4 w-4 cursor-pointer" /> My Orders
                                </Link>)}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4 cursor-pointer" /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>)
                    :
                    (<Link to="/login"><User2Icon /></Link>)
            }
        </>
    );
}
