import { useDebounce } from "@/hooks/url/useDebounce";
import React, { useState, useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const inputRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    // 🔥 Debounced value
    const debouncedSearch = useDebounce(searchText, 400);

    // Sync input with URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("search");

        if (query) {
            setSearchText(query);
            setShowSearch(true);
        } else {
            setSearchText("");
            setShowSearch(false);
        }
    }, [location.search]);

    // Autofocus
    useEffect(() => {
        if (showSearch) {
            inputRef.current?.focus();
        }
    }, [showSearch]);


    useEffect(() => {
        if (!showSearch) return;

        const params = new URLSearchParams(location.search);

        if (!debouncedSearch.trim()) {
            params.delete("search");
        } else {
            params.set("search", debouncedSearch);
        }

        params.set("page", "1"); // reset pagination

        navigate(`/shop?${params.toString()}`, { replace: true });
    }, [debouncedSearch]);

    return (
        <form className="flex items-center gap-2">
            {showSearch && (
                <input
                    ref={inputRef}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border border-gray-400 rounded-lg px-2 py-1 text-sm w-40 transition-all"
                    placeholder="Search..."
                />
            )}

            <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="p-1"
            >
                <BsSearch />
            </button>
        </form>
    );
}
