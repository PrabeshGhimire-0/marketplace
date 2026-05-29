'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [listing, setListing] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const { data: listing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()

      setListing(listing)

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchData()
  }, [])

  const handleContact = async () => {
    if (!user) {
      router.push('/register')
      return
    }

    if (!message) {
      setError('Please write a message!')
      return
    }

    setLoading(true)
    setError('')
    const supabase = createClient()

    const { error } = await supabase.from('messages').insert({
      listing_id: listing.id,
      sender_id: user.id,
      receiver_id: listing.user_id,
      sender_email: user.email,
      text: message,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (!listing) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading listing...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden h-80">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              📦
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {listing.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-2">
            {listing.title}
          </h1>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            ${listing.price}
          </p>
          <p className="text-gray-500 mb-2">📍 {listing.location}</p>
          <p className="text-gray-500 mb-2">👤 {listing.user_email}</p>
          <p className="text-gray-600 mt-4 mb-6">{listing.description}</p>

          {/* Contact Seller */}
          {sent ? (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
              ✅ Message sent to seller!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-gray-800">Contact Seller</h3>

              {error && (
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  user
                    ? 'Write your message to the seller...'
                    : 'Login to contact the seller'
                }
                disabled={!user}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
              />

              <button
                onClick={handleContact}
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {!user
                  ? 'Login to Contact Seller'
                  : loading
                    ? 'Sending...'
                    : 'Send Message'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}