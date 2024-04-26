export default function Guitar({ data, addToCart }) {
    
    const handleClick = (guitarData) => {
        return addToCart(guitarData);
    }
    
    
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={ `img/${data.image}.jpg` } alt="imagen guitarra" />
            </div>
            
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{ data.name }</h3>
                <p>{ data.description }</p>
                <p className="fw-black text-primary fs-3">${ data.price }</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={ () => handleClick(data) }
                >Agregar al Carrito</button>
            </div>
        </div>  
    );
}