'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, ChevronRight, Layers } from 'lucide-react';

const categoryImages: Record<string, string> = {
    'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1500&auto=format&fit=crop',
    'Apparel': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1500&auto=format&fit=crop',
    'Home & Living': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1500&auto=format&fit=crop'
};

export default function CategoriesPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: categoriesApi.getAll,
    });

    const categories = data?.categories || [];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">Browse Categories</h1>
                <p className="mx-auto max-w-2xl text-lg text-neutral-500">
                    Find exactly what you're looking for by browsing through our curated collections.
                </p>
            </div>

            {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category: any) => {
                        const bgImage = categoryImages[category.name] || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1500&auto=format&fit=crop';
                        return (
                            <Link key={category.id} href={`/products?categoryId=${category.id}`}>
                                <Card className="group h-full overflow-hidden hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <div
                                        className="relative h-48 bg-neutral-100 flex items-center justify-center overflow-hidden bg-cover bg-center"
                                        style={{ backgroundImage: `url(${bgImage})` }}
                                    >
                                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                                        <h3 className="relative z-10 text-3xl font-bold text-white tracking-widest shadow-black drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
                                            {category.name}
                                        </h3>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-3 border-b pb-3">
                                            <span className="font-semibold text-primary">Explore Collection</span>
                                            <ChevronRight className="h-5 w-5 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-neutral-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                                            {category.description || `Explore our high-quality selection of ${category.name.toLowerCase()}.`}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                                            <ShoppingBag className="h-4 w-4" />
                                            <span>{category._count?.products || 0} Products</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
