'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const createColumns = (onDelete: (id: string) => void): ColumnDef<Product>[] => [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square max-h-12">
          <Image
            src={`https://api.slingacademy.com/public/sample-products/1.png`}
            alt={row.getValue('name')}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'category.name',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price);

      return <span>{formattedPrice}</span>;
    }
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onDelete={onDelete} />
  }
];
