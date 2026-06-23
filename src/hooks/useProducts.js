import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        // Fetch multiple gadget categories
        const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
        const allProducts = [];

        for (const category of categories) {
          const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=30`);
          const data = await res.json();
          allProducts.push(...data.products);
        }

        console.log('Products data:', allProducts);

        const mapped = allProducts.map((p) => ({
          id: p.id,
          name: p.title,
          category: p.category,
          price: `$${p.price}`,
          oldPrice: `$${Math.round(p.price * 1.2)}`,
          discount: `${p.discountPercentage.toFixed(0)}% off`,
          image: p.thumbnail,
          alt: p.title,
          images: p.images.slice(0, 4),
          colors: ["Black", "White", "Silver"],
          variants: ["Standard", "Bundle", "Bundle + Case"],
        }));

        // Shuffle the products for more variety
        const shuffled = [...mapped].sort(() => Math.random() - 0.5);
        setProducts(shuffled);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};