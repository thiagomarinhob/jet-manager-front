'use client'

import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { createColumns } from './product-tables/columns';
import { Product } from '@/constants/data';

interface PropsProduct {
  products: Product[]
}

export default function ProductListingPage({ products }: PropsProduct) {
  function handleDelete(id: string) {
    console.log("h", id);
  }

  return (
    <ProductTable
      columns={createColumns(handleDelete)}
      data={products}
      totalItems={products.length}
    />
  );
}
