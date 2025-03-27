import { Tables } from "./components/tables/tables";


export default function TablesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tables />
      </main>
    </div>
  )
}

