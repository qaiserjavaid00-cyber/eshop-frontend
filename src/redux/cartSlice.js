

// import { createSlice } from '@reduxjs/toolkit';
// import { updateCart } from '../Utils/cartUtils';

// const initialState = localStorage.getItem('cart')
//     ? JSON.parse(localStorage.getItem('cart'))
//     : { cartItems: [], shippingAddress: {}, paymentMethod: 'Stripe' };

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const item = action.payload;
//             const existItem = state.cartItems.find((x) => x._id === item._id);

//             if (existItem) {
//                 state.cartItems = state.cartItems.map((x) =>
//                     x._id === existItem._id ? item : x
//                 );
//             } else {
//                 state.cartItems.push(item);
//             }

//             return updateCart(state); // This sets full cart in localStorage
//         },

//         removeFromCart: (state, action) => {
//             state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//             return updateCart(state);
//         },

//         // ✅ Fixed: Preserve entire cart state when saving to localStorage
//         updateCartQty: (state, action) => {
//             const { id, qty } = action.payload;
//             const item = state.cartItems.find((x) => x._id === id);
//             if (item) {
//                 item.qty = qty;
//             }

//             // ✅ Save the entire cart object (not just cartItems)
//             // localStorage.setItem('cart', JSON.stringify(state));
//             return updateCart(state);
//         },

//         saveShippingAddress: (state, action) => {
//             state.shippingAddress = action.payload;
//             localStorage.setItem('cart', JSON.stringify(state));
//         },

//         savePaymentMethod: (state, action) => {
//             state.paymentMethod = action.payload;
//             localStorage.setItem('cart', JSON.stringify(state));
//         },

//         clearCartItems: (state) => {
//             state.cartItems = [];
//             localStorage.setItem('cart', JSON.stringify(state));
//         },

//         resetCart: () => initialState,
//     },
// });

// export const {
//     addToCart,
//     removeFromCart,
//     updateCartQty,
//     saveShippingAddress,
//     savePaymentMethod,
//     clearCartItems,
//     resetCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


// export const selectTotalQuantity = state =>
//     state.cart.cartItems.reduce(
//         (sum, item) => sum + Number(item.quantity || 0),
//         0
//     );

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../Utils/cartUtils';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, buyNowItem: null, paymentMethod: 'Stripe' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            // ✅ Check if the same product variant already exists
            const existItem = state.cartItems.find(
                (x) =>
                    x._id === item._id &&
                    x.size === item.size &&
                    x.color === item.color
            );

            if (existItem) {
                // Replace the existing variant
                state.cartItems = state.cartItems.map((x) =>
                    x._id === item._id &&
                        x.size === item.size &&
                        x.color === item.color
                        ? item
                        : x
                );
            } else {
                // Add new variant
                state.cartItems.push(item);
            }
            return updateCart(state);
        },

        removeFromCart: (state, action) => {
            // Expect payload to be an object { _id, size, color }
            const { _id, size, color } = action.payload;
            state.cartItems = state.cartItems.filter(
                (x) => !(x._id === _id && x.size === size && x.color === color)
            );
            return updateCart(state);
        },

        updateCartQty: (state, action) => {
            const { _id, size, color, qty } = action.payload;
            const item = state.cartItems.find(
                (x) => x._id === _id && x.size === size && x.color === color
            );
            if (item) {
                item.qty = qty;
            }
            return updateCart(state);
        },

        setBuyNowItem: (state, action) => {
            state.buyNowItem = action.payload;
        },
        clearBuyNowItem: (state) => {
            state.buyNowItem = null;
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        clearCartItems: (state) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },

        resetCart: () => initialState,
    },
});

export const {
    addToCart,
    removeFromCart,
    updateCartQty,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart,
    setBuyNowItem,
    clearBuyNowItem,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selector for total quantity
export const selectTotalQuantity = (state) =>
    state.cart.cartItems.reduce((sum, item) => sum + Number(item.qty || 0), 0);
