import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";
import { CartItem } from "./cart-item";
import { getProducts } from "../../utils/api";
import { clearCart } from "../../utils/localStorageCart";
import "./cart.css";


export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { cartItems, setCartItems} = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [cartKey, setCartKey] = useState(0);

 
//tie fetching with context when user is authenticated. Global state once the user is logged in, where only if authenticated, then grab their cart with cart id or something.
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    // console.log("cart items to check after refresh", cartItems);
    // Check if the cart is empty
    const isEmptyCart = Object.values(cartItems).every(
      (quantity) => quantity === 0
    );
    setIsEmpty(isEmptyCart);
    
  }, [cartItems]);

  useEffect(() => {
    // Check if the cart is empty after logout and trigger a re-render
    //if the localstorage.getItem(cart) === 0, have to use soemthing to check if the cart OBJECT is empty in local storrage
     //if the localstorage.getItem(cart) === 0, have to use soemthing to check if the cart OBJECT is empty in local storage
    //  if (Object.keys(localStorage.getItem("cart")).length === 0) {
    //   setIsEmpty(true);
    if (Object.keys(cartItems).length === 0) {
      setIsEmpty(true);
    }
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      if (cartItems[product.id] > 0) {
        total += cartItems[product.id] * product.price;
      }
    });
    return total.toFixed(2);
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  const handleClearCart = () => {
   
   clearCart();
   setCartItems({});
   setIsEmpty(true);


   // Increment the cart key to force re-render of empty cart after logout
   setCartKey((prevKey) => prevKey + 1);

  };

  return (
    <div key={cartKey}>
  <div className="container pt-5 cart">
    {isEmpty ? (
      <div className="mt-0 pb-0 vh-100">
        <p>Your cart is empty.</p>
        <div> <Link to="/">Continue Shopping</Link></div>
      </div>
    ) : (
      <div className="container">
        <div className="container">
          <div className="text-center mb-4 ">
            <h1>Your Cart Items</h1>
          </div>
          <div className="row">
            <div className="col">

              {/* Render the subtotal, clear cart button, and continue shopping link */}
              <div className="subtotal pl-5 mt-5">
                <h1>Subtotal</h1>
                <h2>&#40; {calculateTotalQuantity()} &#41; items</h2>
                <h2>Total Price: ${calculateTotalPrice()}</h2>
                <div className="cart-links">
                <Link to="checkout" className="proceed-to-checkout lign-items-center"><button className="checkout-btn mt-3 mb-2 p-2 rounded">Proceed to Checkout</button></Link>
                <div className="clear-cart-btn">
                  <button onClick={handleClearCart} className="checkout-btn mb-0 p-2 rounded">Clear Cart</button>
                </div>
                <div className="continue-shopping text-center mt-0 fw-bolder"> <Link to="/"> <h1>&#8592;</h1> Continue Shopping</Link></div></div>
              </div>
            </div>

            <div className="col-md-5 text-center mb-4">
                  {products.map((product) => {
                    if (cartItems[product.id] > 0) {
                      return (
                        <div  key={product.id}>
                          <CartItem
                            data={product}
                            quantity={cartItems[product.id]}
                            newAmount={cartItems[product.id]}
                          />
                        </div>
                      );
                    }
                  })}                
              
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
}
