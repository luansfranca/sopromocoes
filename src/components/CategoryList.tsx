import React from 'react';
import {
  Smartphone,
  Cpu,
  Gamepad2,
  Shirt,
  Watch,
  Laptop,
  Camera,
  BookOpen,
  Heart
} from 'lucide-react';

interface CategoryListProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'Smartphone', icon: Smartphone, slug: 'smartphone' },
  { name: 'Eletrônicos', icon: Cpu, slug: 'eletronicos' },
  { name: 'Games', icon: Gamepad2, slug: 'games' },
  { name: 'Roupas', icon: Shirt, slug: 'roupas' },
  { name: 'Acessórios', icon: Watch, slug: 'acessorios' },
  { name: 'Notebooks', icon: Laptop, slug: 'notebooks' },
  { name: 'Câmeras', icon: Camera, slug: 'cameras' },
  { name: 'Livros', icon: BookOpen, slug: 'livros' },
  { name: 'Saúde e Beleza', icon: Heart, slug: 'saude-beleza' },
];

export function CategoryList({ onCategorySelect }: CategoryListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => onCategorySelect(category.slug)}
              className="flex flex-col items-center min-w-[100px] px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              <category.icon className="h-6 w-6 mb-1" />
              <span className="text-sm whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}