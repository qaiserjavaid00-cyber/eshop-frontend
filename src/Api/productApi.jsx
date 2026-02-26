import axios from "axios"
const BASE_URL = "http://localhost:8000";

export const createProductAPI = async (proData) => {
    // console.log(userData)
    const response = await axios.post(
        `${BASE_URL}/product/create`, proData,
        {
            withCredentials: true,
        }
    );
    // console.log(response.data)
    return response.data;

}



//////get alll ptroducst

export const getAllproductsAPI = async () => {
    // console.log(userData)
    const response = await axios.get(`${BASE_URL}/product/list`,
        {
            withCredentials: true,
        }
    );
    // console.log(response.data)
    return response.data;

}


export const getProductFiltersAPI = async () => {
    // console.log(userData)
    const response = await axios.get(`${BASE_URL}/product/filters`,
        {
            withCredentials: true,
        }
    );
    // console.log(response.data)
    return response.data;

}
/// Home products

// export const getHomeProductsAPI = async (filters) => {
//     console.log("my filters", filters)
//     const response = await axios.get(`${BASE_URL}/product/products`,
//         {
//             params: filters,
//             withCredentials: true,
//         }
//     );
//     console.log(response.data)
//     return response.data;

// }


///home products api chatGPT

// Api/productApi.js


export const getHomeProductsAPI = async (filters = {}) => {
    const params = new URLSearchParams();
    for (const key in filters) {
        const val = filters[key];
        if (Array.isArray(val)) {
            val.forEach(v => v && params.append(key, v));
        } else if (val) {
            params.append(key, val);
        }
    }

    const response = await axios.get(`${BASE_URL}/product/products?${params.toString()}`);
    return response.data; // ✅ MUST return this
};


/////featured 

export const fetchFeaturedProductsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/product/featured`);
    return data;
};

////flash
export const fetchFlashProductsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/product/flash`);
    return data;
};
////Sales
export const fetchSalesProductsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/product/sales`);
    console.log("sales data from API", data)
    return data;
};



///// delete


export const deleteProductAPI = async (catID) => {
    // console.log(userData)
    const response = await axios.delete(
        `${BASE_URL}/product/${catID}`,
        {
            withCredentials: true,
        }
    );
    // console.log(response.data)
    return response.data;

}

///get single product via slug

export const getProductAPI = async (id) => {
    console.log("API ID", id)
    const response = await axios.get(
        `${BASE_URL}/product/product/${id}`,
        {
            withCredentials: true,
        }
    );
    // console.log(response.data)
    return response.data;

}

///get single product via slug

export const updateProductAPI = async (id, formData) => {
    console.log("Product ID", id)

    const response = await axios.put(
        `${BASE_URL}/product/update/${id}`, formData,
        {
            withCredentials: true,
        }
    );
    // console.log(response.data)
    return response.data;

}


/////////fetch product by slug
export const getProductBySlugAPI = async (slug) => {
    const { data } = await axios.get(`${BASE_URL}/product/${slug}`);
    return data;
};

///////////ratings

export const rateProductAPI = async ({ productId, star }) => {
    const response = await axios.put(
        `${BASE_URL}/product/star`,
        { productId, star },
        {
            withCredentials: true,
        }
    );
    return response.data;
};

/////////fetch variant byproductId
export const getVariantsByProductIdAPI = async (productId) => {
    const { data } = await axios.get(`${BASE_URL}/variant/${productId}`);
    return data;
};

export const deleteVariantAPI = async (variantId) => {
    const { data } = await axios.delete(`${BASE_URL}/variant/del/${variantId}`);
    return data;
};