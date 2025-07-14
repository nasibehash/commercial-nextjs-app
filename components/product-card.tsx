'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/stores/cart-store"
import { useFavoritesStore } from "@/stores/favorites-store"
import { Heart, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/hooks/use-products'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)
  const { toggleItem, isFavorite } = useFavoritesStore()
  
  const isProductFavorite = isFavorite(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.inStock) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.colors?.[0] || 'Default',
        inStock: product.inStock
      })
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category
    })
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      viewMode === 'list' ? 'flex flex-row' : ''
    }`}>
      <Link href={`/products/${product.id}`} className="contents">
        <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
              }`}
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-blue-600">Featured</Badge>
            )}
            {product.originalPrice && (
              <Badge className="absolute top-2 right-2 bg-red-500">
                Sale
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart 
                className={`h-4 w-4 ${
                  isProductFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                }`} 
              />
            </button>
          </div>
        </div>
        
        <div className={viewMode === 'list' ? 'flex-1' : ''}>
          <CardHeader className={viewMode === 'list' ? 'pb-2' : ''}>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {product.name}
              </CardTitle>
            </div>
            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              <Badge variant="outline">{product.category}</Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <Button 
                size="sm" 
                disabled={!product.inStock}
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  )
}