'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFormState } from "@/hooks/use-form-state"
import { ActionAddNewTransaction } from '../action';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Category } from '@/constants/data';

interface CategoryType {
  categories: Category[]
}

const AddNewTransaction = ({categories}: CategoryType) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('entrada');

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    ActionAddNewTransaction,
    () => {
      console.log("🚀 ", errors, message, success, isPending);
    }
  )

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus /> Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Descrição</Label>
            <Input
              value={description}
              name='description'
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da transação"
              required
            />
          </div>

          <div>
            <Label>Categoria</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              required
              name='category'
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.ID} value={cat.ID}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Valor</Label>
            <Input
              type="number"
              name='amount'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Valor da transação"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              name='type'
              value={type}
              variant={type === 'entrada' ? 'default' : 'outline'}
              onClick={() => setType('entrada')}
              className="flex-1"
            >
              Entrada
            </Button>
            <Button
              type="button"
              variant={type === 'saida' ? 'destructive' : 'outline'}
              onClick={() => setType('saida')}
              className="flex-1"
            >
              Saída
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Adicionar Transação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTransaction;