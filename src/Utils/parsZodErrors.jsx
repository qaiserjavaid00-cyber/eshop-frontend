// utils/parseZodError.js
export const parseZodError = (error) => {
    const validationErrors = error?.response?.data?.errors;
    if (!validationErrors) return error?.response?.data?.message || "Something went wrong";

    const flattenErrors = (errors, path = "") => {
        return Object.entries(errors)
            .flatMap(([key, value]) => {
                const currentPath = path ? `${path}.${key}` : key;
                if (value?._errors) {
                    // attach field name for clarity
                    return value._errors.map(msg => `${currentPath}: ${msg}`);
                } else {
                    return flattenErrors(value, currentPath);
                }
            });
    };

    return flattenErrors(validationErrors).join("\n");
};
