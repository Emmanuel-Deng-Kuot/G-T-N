import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import { useCart } from "../context/useCart";
import useAnimations from "../hooks/useAnimations";



const Cart = () => {
  const containerRef = useAnimations();

  const { cartItems, updateQuantity, toggleCheck, removeFromCart } = useCart();



  const parsePrice = (priceStr) => {

    if (!priceStr) return 0;

    return Number(priceStr.replace(/[^0-9.-]/g, ""));

  };



  const checkedItems = cartItems.filter(item => item.checked);

  const subtotal = checkedItems.reduce((sum, item) => {

    return sum + (parsePrice(item.cartPrice) * item.quantity);

  }, 0);



  const tax = Math.round(subtotal * 0.1);

  const service = Math.round(subtotal * 0.05);

  const shipping = checkedItems.length > 0 ? 200 : 0;

  const total = subtotal + tax + service + shipping;



  return (

    <div ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden">

      <Navbar />



      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        {cartItems.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-32 gap-4">

            <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />

            </svg>

            <p className="text-slate-400 text-sm">Your cart is empty.</p>

          </div>

        ) : (

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">



            {/* Cart items */}

            <div className="flex flex-col gap-4 flex-1 w-full">

              {cartItems.map((item, index) => (

                <div key={index} className="flex items-start lg:items-center gap-3 lg:gap-4">



                  {/* Checkbox */}

                  <button

                    onClick={() => toggleCheck(index)}

                    className={`w-5 h-5 lg:w-6 lg:h-6 rounded-md shrink-0 flex items-center justify-center border-2 transition-all duration-200 mt-3 lg:mt-0 ${

                      item.checked

                        ? "bg-[#2D2B6B] border-[#2D2B6B]"

                        : "bg-white border-slate-300"

                    }`}

                  >

                    {item.checked && (

                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />

                      </svg>

                    )}

                  </button>



                  {/* Card */}

                  <div

                    className="flex flex-1 bg-white rounded-2xl p-3 lg:p-4 gap-3 lg:gap-5"

                    style={{ boxShadow: "0 2px 16px rgba(100,90,180,0.07)" }}

                  >

                    {/* Image */}

                    <div

                      className="w-20 h-20 lg:w-28 lg:h-24 rounded-xl shrink-0 flex items-center justify-center overflow-hidden"

                      style={{ background: "#f5f5f7", padding: "10px" }}

                    >

                      <img

                        src={item.image}

                        alt={item.alt}

                        className="object-contain w-full h-full"

                      />

                    </div>



                    {/* Info + quantity stacked on mobile */}

                    <div className="flex flex-col flex-1 min-w-0 gap-1">

                      <p className="text-sm font-bold text-slate-900 leading-snug">{item.name}</p>

                      <p className="text-xs text-slate-400">{item.variant}</p>

                      <p className="text-xs text-slate-400">{item.color}</p>

                      <div className="flex items-center gap-2 mt-1">

                        <span className="text-sm font-bold text-[#2D2B6B]">${item.cartPrice}</span>

                        <span className="text-sm text-slate-400 line-through">${item.cartOldPrice}</span>

                      </div>



                      {/* Quantity — inline on mobile below price */}

                      <div className="flex items-center gap-2 border border-slate-200 rounded-full px-3 py-1.5 w-fit mt-2">

                        <button

                          onClick={() => updateQuantity(index, -1)}

                          className="w-4 h-4 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"

                        >

                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />

                          </svg>

                        </button>

                        <span className="text-sm font-semibold text-slate-900 w-4 text-center">

                          {item.quantity}

                        </span>

                        <button

                          onClick={() => updateQuantity(index, 1)}

                          className="w-4 h-4 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"

                        >

                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />

                          </svg>

                        </button>

                      </div>

                    </div>



                    {/* Remove — desktop only */}

                    <button

                      onClick={() => removeFromCart(index)}

                      className="hidden lg:flex p-2 hover:bg-red-50 rounded-full transition-colors shrink-0 self-center"

                    >

                      <svg className="w-4 h-4 text-slate-300 hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />

                      </svg>

                    </button>



                  </div>

                </div>

              ))}

            </div>



            {/* Summary */}

            <div

              className="w-full lg:w-80 lg:shrink-0 rounded-3xl p-5 lg:p-6 flex flex-col gap-5"

              style={{ background: "#f0eff8" }}

            >

              <h2 className="text-2xl lg:text-xl font-extrabold text-slate-900">Summary</h2>



              <div className="flex flex-col gap-3">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-500">Subtotal</span>

                  <span className="text-sm text-slate-700">${subtotal}</span>

                </div>

                {[

                  { label: "Tax", value: `$${tax}` },

                  { label: "Service", value: `$${service}` },

                  { label: "Shipping", value: `$${shipping}` },

                ].map((row) => (

                  <div key={row.label} className="flex items-center justify-between">

                    <span className="text-sm text-slate-500">{row.label}</span>

                    <span className="text-sm text-slate-700">{row.value}</span>

                  </div>

                ))}



                <div className="w-full h-px bg-slate-200 my-1" />



                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-700">Total</span>

                  <span className="text-2xl font-extrabold text-[#2D2B6B]">${total}</span>

                </div>

              </div>



              {/* CTA — visible on both mobile and desktop */}

              <button className="w-full flex items-center justify-center gap-3 bg-[#2D2B6B] hover:bg-indigo-900 text-white text-sm font-semibold py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:-translate-y-px mt-2">

                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />

                </svg>

                Get the product

              </button>



            </div>



          </div>

        )}

      </section>



      <Footer />

    </div>

  );

};



export default Cart;

