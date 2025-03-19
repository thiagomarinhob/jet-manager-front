import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
// import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
// import { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';
import ProductListingPage from './_components/product-listing';
import ProductTableAction from './_components/product-tables/product-table-action';
import { getCurrentRestaurant } from '@/auth/auth';
import getProducts from '@/http/get-products';
import getCategories from '@/http/get-categories';

export const metadata = {
  title: 'Dashboard: Products'
};

// type pageProps = {
//   searchParams: SearchParams;
// };

export default async function Page() {
  // Allow nested RSCs to access the search params (in a type-safe way)
  // searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });
  const restaurant = await getCurrentRestaurant()
  const data = await getProducts(restaurant as string)
  const dataCategory = await getCategories(restaurant as string)

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/product/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTableAction categories={dataCategory.items} />
        <Suspense
          key={1}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage products={data.items} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
