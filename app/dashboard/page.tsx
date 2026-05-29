'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [listings, setListings] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/register')
        return
      }

      setUser(user)

      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setListings(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this listing?')
    if (!confirmed) return

    const supabase = createClient()
    await supabase.from('listings').delete().eq('id', id)
    setListings(listings.filter((l) => l.id !== id))
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading your listings...
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
          <p className="text-gray-500 mt-1">Welcome, {user?.email}</p>
        </div>
        <Link
          href="/sell"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + New Listing
        </Link>
      </div>

      {/* Listings */}
      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">
            You have no listings yet
          </p>
          <Link
            href="/sell"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Post Your First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Image */}
              <div className="h-40 bg-gray-100">
                {listing.image_url ? (
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    📦
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">
                  {listing.title}
                </h3>
                <p className="text-blue-600 font-bold mt-1">${listing.price}</p>
                <p className="text-xs text-gray-400 mt-1">{listing.location}</p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/listings/${listing.id}`}
                    className="flex-1 text-center text-sm border border-gray-300 text-gray-600 py-1.5 rounded-lg hover:border-blue-500 hover:text-blue-600 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="flex-1 text-sm bg-red-50 text-red-500 py-1.5 rounded-lg hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}