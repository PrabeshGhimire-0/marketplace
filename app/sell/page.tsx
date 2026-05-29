'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const [user, setUser] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const categories = ['Electronics', 'Clothing', 'Furniture', 'Vehicles', 'Books', 'Other']

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/register')
      } else {
        setUser(user)
      }
    }
    checkUser()
  }, [])

  const handleSubmit = async () => {
    if (!title || !price || !location) {
      setError('Please fill in all required fields!')
      return
    }

    setLoading(true)
    setError('')
    const supabase = createClient()

    const { error } = await supabase.from('listings').insert({
      title,
      description,
      price: parseFloat(price),
      category,
      location,
      image_url: imageUrl,
      user_id: user.id,
      user_email: user.email,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-400">
        Checking authentication...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Sell an Item</h1>
      <p className="text-gray-500 mb-8">Fill in the details of your item</p>

      {error && (
        <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. iPhone 13 Pro Max"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your item..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 250"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Kathmandu, Nepal"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Image URL (optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
          />
          <p className="text-xs text-gray-400 mt-1">
            Paste a link to your image
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
        >
          {loading ? 'Posting...' : 'Post Listing'}
        </button>

      </div>
    </div>
  )
}