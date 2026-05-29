'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: scrolled ? 'rgba(10,15,30,0.95)' : 'rgba(10,15,30,0.8)',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'var(--amber)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>🛍️</div>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '22px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
            }}>Market<span style={{ color: 'var(--amber)' }}>Place</span></span>
          </div>
        </Link>

        {/* Middle */}
        <div style={{ display: 'flex', gap: '32px' }}>
          <Link href="/" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Browse
          </Link>
          <Link href="/sell" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Sell Item
          </Link>
          {user && (
            <Link href="/dashboard" style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              My Listings
            </Link>
          )}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
              }}>👤 {user.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className="btn-outline" style={{ padding: '8px 18px', fontSize: '14px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn-outline" style={{ padding: '8px 18px', fontSize: '14px' }}>
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}