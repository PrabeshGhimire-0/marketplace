'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import ListingCard from '@/components/ListingCard'

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const categories = ['All', 'Electronics', 'Clothing', 'Furniture', 'Vehicles', 'Books', 'Other']

  useEffect(() => {
    fetchListings()
  }, [category])

  const fetchListings = async () => {
    const supabase = createClient()
    let query = supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })

    if (category !== 'All') {
      query = query.eq('category', category)
    }

    const { data } = await query
    setListings(data || [])
    setLoading(false)
  }

  const filtered = listings.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 0 60px',
        position: 'relative',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="animate-fade-up">
          <span style={{
            background: 'rgba(245,158,11,0.15)',
            color: 'var(--amber)',
            padding: '6px 16px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            border: '1px solid rgba(245,158,11,0.3)',
          }}>
            🌟 Buy & Sell Locally
          </span>
        </div>

        <h1 className="animate-fade-up animate-delay-1" style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginTop: '20px',
          marginBottom: '16px',
          lineHeight: '1.1',
          letterSpacing: '-1px',
        }}>
          Find Your Next<br />
          <span style={{ color: 'var(--amber)' }}>Great Deal</span>
        </h1>

        <p className="animate-fade-up animate-delay-2" style={{
          color: 'var(--text-secondary)',
          fontSize: '18px',
          marginBottom: '40px',
        }}>
          Browse thousands of items from people near you
        </p>

        {/* Search Bar */}
        <div className="animate-fade-up animate-delay-3" style={{
          maxWidth: '560px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
          }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for anything..."
            className="input-dark"
            style={{
              padding: '16px 16px 16px 50px',
              fontSize: '16px',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '40px',
        justifyContent: 'center',
      }}>
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '100px',
              border: category === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
              background: category === cat ? 'var(--amber)' : 'rgba(255,255,255,0.04)',
              color: category === cat ? 'var(--navy)' : 'var(--text-secondary)',
              fontWeight: category === cat ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'flex',
        gap: '32px',
        justifyContent: 'center',
        marginBottom: '48px',
      }}>
        {[
          { label: 'Active Listings', value: listings.length },
          { label: 'Categories', value: '6' },
          { label: 'Free to Use', value: '100%' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--amber)',
              fontFamily: 'Playfair Display, serif',
            }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              height: '300px',
              borderRadius: '16px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 0',
          color: 'var(--text-secondary)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p style={{ fontSize: '18px' }}>No listings found</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>Be the first to sell something!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map((listing, i) => (
            <div
              key={listing.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}