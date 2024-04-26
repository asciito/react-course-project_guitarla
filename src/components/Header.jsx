import { useMemo } from "react";

export default function Header({ cart, removeFromCart, incrementFromCart, decrementFromCart, cleanCart }) {
    const cartIsEmpty = useMemo(() => cart && cart.length, [cart]);
    const cartTotal = useMemo(() => cart ? cart.reduce((total, guitar) => total + (guitar.qty * guitar.price), 0) : 0, [cart]);

    return (
        <>
            <header className="py-5 header">
                <div className="container-xl">
                    <div className="row justify-content-center justify-content-md-between">
                        <div className="col-8 col-md-3">
                            <a href="index.html">
                                <img className="img-fluid" src="img/logo.svg" alt="imagen logo" />
                            </a>
                        </div>
                        <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                            <div className="carrito">
                                <img className="img-fluid" src="img/carrito.png" alt="imagen carrito" />

                                <div id="carrito" className="bg-white p-3">
                                    <p className="text-center">El carrito esta vacio</p>
                                    {cartIsEmpty ? (
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart
                                                    ? cart.map(guitar => (
                                                        <tr key={guitar.id}>
                                                            <td>
                                                                <img className="img-fluid" src={`img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                            </td>
                                                            <td>{guitar.name}</td>
                                                            <td className="fw-bold">
                                                                ${guitar.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => decrementFromCart(guitar.id)}
                                                                >
                                                                    -
                                                                </button>
                                                                {guitar.qty}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    onClick={() => incrementFromCart(guitar.id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => removeFromCart(guitar.id)}
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    : null
                                                }
                                            </tbody>
                                        </table>
                                    ) : null
                                    }

                                    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                    <button className="btn btn-dark w-100 mt-3 p-2" onClick={cleanCart}>Vaciar Carrito</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}