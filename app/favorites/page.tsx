"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Star, 
  Trash2,
  Share2,
  Grid3X3,
  List
} from 'lucide-react'

interface FavoriteItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  description: string
  inStock: boolean
  dateAdded: string
}

const initialFavorites: FavoriteItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    dateAdded: "2024-01-15"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 449,
    originalPrice: 599,
    rating: 4.7,
    reviews: 634,
    image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Furniture",
    description: "Comfortable ergonomic chair for long work sessions",
    inStock: true,
    dateAdded: "2024-01-12"
  },
  {
    id: 6,
    name: "Professional Camera Lens",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 312,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Electronics",
    description: "High-performance lens for professional photography",
    inStock: false,
    dateAdded: "2024-01-10"
  },
  {
    id: 8,
    name: "Luxury Skincare Set",
    price: 159,
    rating: 4.7,
    reviews: 567,
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Beauty",
    description: "Complete skincare routine with natural ingredients",
    inStock: true,
    dateAdded: "2024-01-08"
  }
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
  }

  const addToCart = (item: FavoriteItem) => {
    if (item.inStock) {
      alert(`Added ${item.name} to cart!`)
    }
  }

  const shareItem = (item: FavoriteItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: `/products/${item.id}`
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/products/${item.id}`)
      alert('Product link copied to clipboard!')
    }
  }

  const clearAllFavorites = () => {
    if (confirm('Are you sure you want to remove all items from your favorites?')) {
      setFavorites([])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/products" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Products
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start adding products to your favorites to see them here</p>
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your favorites
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={clearAllFavorites}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>

            {/* Favorites Grid/List */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {favorites.map(item => (
                <Card key={item.id} className={`group hover:shadow-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
                        }`}
                      />
                      {item.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          Save ${item.originalPrice - item.price}
                        </Badge>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => shareItem(item)}
                          className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => removeFavorite(item.id)}
                          className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <CardHeader className={viewMode === 'list' ? 'pb-2' : ''}>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          <Link href={`/products/${item.id}`}>
                            {item.name}
                          </Link>
                        </CardTitle>
                        <Heart className="h-5 w-5 text-red-500 fill-current flex-shrink-0 ml-2" />
                      </div>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              {item.rating} ({item.reviews})
                            </span>
                          </div>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Added {new Date(item.dateAdded).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => addToCart(item)}
                          disabled={!item.inStock}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => {
                    const inStockItems = favorites.filter(item => item.inStock)
                    if (inStockItems.length > 0) {
                      alert(`Added ${inStockItems.length} items to cart!`)
                    } else {
                      alert('No items in stock to add to cart.')
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Add All In-Stock to Cart
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const shareText = favorites.map(item => `${item.name} - $${item.price}`).join('\n')
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Favorite Products',
                        text: shareText
                      })
                    } else {
                      navigator.clipboard.writeText(shareText)
                      alert('Favorites list copied to clipboard!')
                    }
                  }}
                >
                  Share Favorites List
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}