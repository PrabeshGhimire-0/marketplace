'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError('')
    setMessage('')

    if (!email || !password) {
      setError('Please fill in all fields!')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match!')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters!')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Account created! Check your email to verify.')
      }
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="animate-fade-up" style={{ width: '100%', maxWidth: '420px' }}>

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
          }}>Create account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Join and start selling today
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

          {message && (
            <div style={{
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.2)',
              color: '#4ade80',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '14px',
            }}>
              ✅ {message}
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

            <div>
              <label style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px',
                letterSpacing: '0.3px',
              }}>CONFIRM PASSWORD</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="input-dark"
              />
            </div>

            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          marginTop: '24px',
        }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--amber)', textDecoration: 'none', fontWeight: '600' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}