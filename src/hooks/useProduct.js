import { useEffect, useReducer } from "react";

const initialState = {
  product: null,
  loading: true,
  error: null,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, product: null, loading: true, error: null };
    case "success":
      return { product: action.product, loading: false, error: null };
    case "error":
      return { product: null, loading: false, error: action.error };
    default:
      return state;
  }
};

export const useProduct = (id) => {
  const [{ product, loading, error }, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    if (!id) return;

    let ignore = false;
    dispatch({ type: "loading" });

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const p = await res.json();

        if (ignore) return;

        dispatch({
          type: "success",
          product: {
            id: p.id,
            name: p.title,
            category: p.category,
            price: `${p.price}`,
            oldPrice: `${Math.round(p.price * 1.2)}`,
            discount: `${p.discountPercentage.toFixed(0)}% off`,
            image: p.thumbnail,
            alt: p.title,
            images: p.images.slice(0, 4),
            colors: ["Black", "White", "Silver"],
            variants: ["Standard", "Bundle", "Bundle + Case"],
            description: p.description,
          },
        });
      } catch (err) {
        if (!ignore) {
          dispatch({ type: "error", error: err.message });
        }
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { product, loading, error };
};
