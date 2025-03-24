import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '../_components/product-view-page';
import getProduct from '@/http/gat-product';
import { getCurrentRestaurant } from '@/auth/auth';
import getCategories from '@/http/get-categories';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: { productId: string } };

export default async function Page({ params }: PageProps) {
  const restaurant = await getCurrentRestaurant()
  const dataProduct = await getProduct(restaurant as string, params.productId)
  const dataCategory = await getCategories(restaurant as string)
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage product={dataProduct} categories={dataCategory.items} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
