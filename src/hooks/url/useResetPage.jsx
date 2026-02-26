import { useNavigate } from "react-router-dom";

export const useResetPage = () => {
    const navigate = useNavigate();

    const resetPageAndNavigate = (updatedParams) => {
        updatedParams.set("page", "1");
        navigate({ search: updatedParams.toString() });
    };

    return resetPageAndNavigate;
};
