'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="animate-fade-up" style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'var(--amber)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 16px',
          }}>🛍️</div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Login to your account
          </p>
        </div>

        {/* Card */}
        <div className="glass" style={{ borderRadius: '20px', padding: '32px' }}>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '14px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px',
                letterSpacing: '0.3px',
              }}>EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-dark"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px',
                letterSpacing: '0.3px',
              }}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-dark"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          marginTop: '24px',
        }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--amber)', textDecoration: 'none', fontWeight: '600' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}