import { useState, useEffect } from "react";

function initialState(key) {
    const data = localStorage.getItem(key);

    if (! data) {
        return [];
    }

    return JSON.parse(data);
}

export function useCart(name = 'cart', qty_limit = 10) {
    const [ cart, setCart ] = useState(initialState(name));

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(cart));
    }, [ cart ]);

    const handleAddCartItem = item => {
        setCart(cart => {
            const cartItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

            if (cartItemIndex === -1) {
                return [ ...cart, { ...item, qty: 1 } ];
            }

            return cart.map((cartItem, index) => {
                if (cartItemIndex === index && cartItem.qty < qty_limit) {
                    cartItem = { ...cartItem, qty: cartItem.qty + 1 };
                }

                return cartItem
            });
        });
    };

    const handleRemoveCartItem = item => {
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
    };

    const handleDecrementCartItem = item => {
        setCart(
            cart.reduce((arr, cartItem) => {
                if (cartItem.id === item.id ) {
                    if (item.qty - 1 > 0) {
                        return [ ...arr, { ...item, qty: item.qty - 1 } ];
                    }

                    return arr;
                }

                return [...arr, cartItem];
            }, [])
        );
    }

    const handleCleanCart = () => setCart([]);

    return {
        cart,
        addCartItem: handleAddCartItem,
        decrementCartItem: handleDecrementCartItem,
        removeCartItem: handleRemoveCartItem,
        cleanCart: handleCleanCart,
    };
}