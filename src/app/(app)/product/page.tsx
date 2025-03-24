import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
// import { searchParamsCache, serialize } from '@/lib/searchparams';
// import { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';

import ProductListingPage from './_components/product-listing';
import ProductTableAction from './_components/product-tables/product-table-action';
import { getCurrentRestaurant } from '@/auth/auth';
import getProducts from '@/http/get-products';
import getCategories from '@/http/get-categories';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs';
import { AddProductButton } from './_components/button-add-product';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);
  
  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const params = await searchParams;
  const key = serialize({ ...params });

  const restaurant = await getCurrentRestaurant()
  const data = await getProducts({restaurant_id: restaurant as string, searchParams})
  const dataCategory = await getCategories(restaurant as string)

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <AddProductButton restaurantId={restaurant as string} categories={dataCategory.items} />
          
        </div>
        <Separator />
        <ProductTableAction categories={dataCategory.items} />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage products={data} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
