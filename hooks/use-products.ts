import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  images?: string[]
  category: string
  description: string
  inStock: boolean
  featured: boolean
  stockCount?: number
  colors?: string[]
  sizes?: string[]
  features?: string[]
  specifications?: Record<string, string>
}

// Mock API functions - replace with actual API calls
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
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
      featured: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249,
      rating: 4.6,
      reviews: 892,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Electronics",
      description: "Advanced fitness tracking with heart rate monitoring",
      inStock: true,
      featured: false
    },
    // Add more products as needed
  ]
}

const fetchProduct = async (id: number): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock single product data
  return {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    category: "Electronics",
    description: "Experience premium audio quality with our flagship wireless headphones featuring advanced noise cancellation technology, premium materials, and exceptional comfort for all-day wear.",
    inStock: true,
    featured: true,
    stockCount: 15,
    colors: ["Black", "Silver", "Navy Blue"],
    sizes: ["One Size"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Quick charge: 5 min = 2 hours playback",
      "Voice assistant compatible"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 ohms",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.0, 3.5mm jack",
      "Battery": "30 hours (ANC on), 40 hours (ANC off)"
    }
  }
}

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (item: { productId: number; quantity: number; color?: string }) => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500))
      return item
    },
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}