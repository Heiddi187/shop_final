import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";

type Product = {
   id: string;
   shop_id?: string;
   name: string;
   slug?: string;
   description?: string;
   price_cents: number
};

function App() {
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
      async function getProducts() {
         const { data, error } = await supabase.from("products").select("*");

         if (error) {
            console.log(error);
         } else {
            setProducts(data);
         }
      }
      getProducts();
   }, []);

   return (
      <>
         <h1>Hello world</h1>
         <div>
            <h1>Products</h1>

            {products.map((product) => (
               <div key={product.id}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>{product.price_cents}</p>
               </div>
            ))}
         </div>
      </>
   );
}

export default App;
