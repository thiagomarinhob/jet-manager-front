'use client'
import ProductForm from './product-form';
import { Category } from '@/constants/data';

type TProductViewPageProps = {
  product: {
    id: string;
    restaurant_id: string;
    name: string;
    description: string;
    price: number;
    category_id: string;
    type: string;
    in_stock: boolean;
    image_url: string;
  };
  categories: Category[]
};

export default function ProductViewPage({ product, categories }: TProductViewPageProps) {
  const pageTitle = 'Update Product';

  return <ProductForm initialData={product} categories={categories} pageTitle={pageTitle} />;
}
