'use client'

import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { createColumns } from './product-tables/columns';
import { Product } from '@/constants/data';

interface PropsProduct {
  products: {
    items: Product[];
    total_items: number,
    total_pages: number,
    current_page: number,
    page_size: number,
    has_next: boolean,
    has_prev: boolean
  }
}

export default function ProductListingPage({ products }: PropsProduct) {
  function handleDelete(id: string) {
    console.log("h", id);
  }

  return (
    <ProductTable
      products={products}
      columns={createColumns(handleDelete)}
      data={products.items}
      totalItems={products.total_items}
    />
  );
}
