'use client'
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type TProductViewPageProps = {
  productId: string;
};

export default function ProductViewPage({
  productId
}: TProductViewPageProps) {
  const { data: session } = useSession();
  let pageTitle = 'Update Product';
  const [product, setProduct] = useState()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!session) return;
      try {

        const response = await fetch(
          `https://api-golang-1.onrender.com/products/${productId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user.id}`,
              'Establishment-ID': '6f2c6de9-0fad-4eee-859c-cbb41427db0e'
            }
          }
        )
        const data = await response.json();
        if (!data) {
          notFound();
        }
        setProduct(data)
      } catch (err) {
        console.log("🚀 ~ fetchProduct ~ err:", err)
      }
    }

    fetchProduct()
  }, [productId, session])

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
