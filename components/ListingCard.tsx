import Link from 'next/link'

export default function ListingCard({ listing }: { listing: any }) {
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <Link href={`/listings/${listing.id}`} style={{ textDecoration: 'none' }}>
      <div className="card-hover" style={{
        background: 'var(--navy-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}>

        {/* Image */}
        <div style={{
          height: '200px',
          background: 'rgba(255,255,255,0.03)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.05), rgba(245,158,11,0.1))',
            }}>
              📦
            </div>
          )}

          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(10,15,30,0.85)',
            backdropFilter: 'blur(8px)',
            color: 'var(--amber)',
            padding: '4px 10px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: '600',
            border: '1px solid rgba(245,158,11,0.2)',
          }}>
            {listing.category}
          </div>

          {/* Time Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(10,15,30,0.85)',
            backdropFilter: 'blur(8px)',
            color: 'var(--text-secondary)',
            padding: '4px 10px',
            borderRadius: '100px',
            fontSize: '11px',
          }}>
            {timeAgo(listing.created_at)}
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: '16px' }}>
          <h3 style={{
            color: 'var(--text-primary)',
            fontWeight: '600',
            fontSize: '15px',
            marginBottom: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {listing.title}
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              color: 'var(--amber)',
              fontWeight: '700',
              fontSize: '20px',
              fontFamily: 'Playfair Display, serif',
            }}>
              ${listing.price}
            </span>
            <span style={{
              color: 'var(--text-secondary)',
              fontSize: '12px',
            }}>
              📍 {listing.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}