//React
import { useContext } from "react";

//Context
import { ProductsContext } from "../../contexts/products.context";

//Components
import ProductCard from "../../components/product-card/product-card.component";

//Styling
import './shop.styles.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products ? 
            
                ( products.map( (product) => 
                    <ProductCard key={product.id} product={product} />
                ))
            :
                (<span> No products available</span>)
            }
        </div>
    );
}

export default Shop;