"use client"

import ProductDialog from "./product-dialog"
import { useRouter } from "next/navigation"

interface Category {
  id: string;
  name: string;
  description: string;
  Active: boolean;
}

interface AddProductButtonProps {
  restaurantId: string
  categories: Category[]
}

export function AddProductButton({ restaurantId, categories }: AddProductButtonProps) {
  const router = useRouter()

  const handleSuccess = () => {
    router.refresh()
  }

  return <ProductDialog restaurantId={restaurantId} categories={categories} onSuccess={handleSuccess} />
}

