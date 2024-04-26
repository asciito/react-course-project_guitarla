import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from './data/db.js';
import { useState } from "react";
import { useCart } from "./hooks/cart.js";

export default function App() {
    const [ data, ] = useState(db);
    const { cart, cleanCart, addCartItem, decrementCartItem, removeCartItem } = useCart();

    return (
        <>
            <Header
                cart={ cart }
                cleanCart={ cleanCart }
                removeFromCart={ removeCartItem }
                incrementFromCart={ addCartItem }
                decrementFromCart={ decrementCartItem }
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {
                        data
                            ? data.map(guitar => <Guitar key={guitar.id} data={ guitar } addToCart={ addCartItem } />)
                            : null
                    }
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