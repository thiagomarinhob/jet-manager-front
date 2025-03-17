import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { Employee } from '@/constants/data';
// import { fakeUsers } from '@/constants/mock-api';
// import { searchParamsCache } from '@/lib/searchparams';
import TransactionTable from './transaction-tables';
import GetTransactions from '@/http/get-transactions';
import { getCurrentUser } from '@/auth/auth';

import AddNewTransaction from './add-new-transaction';
import getCategories from '@/http/get-categories';

export default async function TransactionListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const user = await getCurrentUser()
  const transactions = await GetTransactions(user as string)
  const categories = await getCategories(user as string)
  console.log("🚀 ~ TransactionListingPage ~ categories:", categories)
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('q');
  // const gender = searchParamsCache.get('gender');
  // const pageLimit = searchParamsCache.get('limit');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(gender && { genders: gender })
  // };

  // mock api call
  // const data = [];
  // const totalUsers = data.total_users;
  // const employee: Employee[] = data.users;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Transactions (${transactions.length})`}
            description="Manage employees (Server side table functionalities.)"
          />
          <AddNewTransaction categories={categories} />
        </div>
        <Separator />
        <TransactionTable data={transactions} totalData={transactions.length} />
      </div>
    </PageContainer>
  );
}
