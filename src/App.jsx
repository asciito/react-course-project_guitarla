import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from './data/db.js';
import { useEffect, useState } from "react";

const initialState = () => {
    const data = localStorage.getItem('cart');

    return data ? JSON.parse(data) : [];
}

export default function App() {
    const [data,] = useState(db);
    const [cart, setCart] = useState(initialState());

    const CART_ITEM_LIMIT_BY_ELEMENT = 10;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const handleCart = guitar => {
        const guitarIndex = cart.findIndex(item => item.id === guitar.id);

        if (guitarIndex === -1) {
            setCart([...cart, { ...guitar, qty: 1 }]);
        } else {
            handleIncrementCartElementQty(cart[guitarIndex].id)
        }
    };

    const handleRemoveFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleIncrementCartElementQty = (id) => {
        setCart(cart.map(item => id === item.id && item.qty < CART_ITEM_LIMIT_BY_ELEMENT ? { ...item, qty: item.qty + 1 } : item));
    }

    const handleDecrementCartElementQty = (id) => {
        setCart(
            cart
                .map(item => id === item.id ? (item.qty - 1 > 0 ? { ...item, qty: item.qty - 1 } : null) : item)
                .filter(item => item !== null)
        );
    }

    const handleCleanCart = () => setCart([]);

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={handleRemoveFromCart}
                incrementFromCart={handleIncrementCartElementQty}
                decrementFromCart={handleDecrementCartElementQty}
                cleanCart={handleCleanCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data
                        ? data.map(guitar => <Guitar key={guitar.id} data={guitar} addToCart={handleCart} />)
                        : null}
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    );
}