'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const createColumns = (onDelete: (id: string) => void): ColumnDef<Product>[] => [
  {
    accessorKey: 'photo_url',
    header: 'Imagem',
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
    header: 'Nome'
  },
  {
    accessorKey: 'category.name',
    header: 'Categoria'
  },
  {
    accessorKey: 'price',
    header: 'Preço',
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
    header: 'Descrição'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onDelete={onDelete} />
  }
];
