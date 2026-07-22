import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analytics } from '@/utils/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    analytics.pageView(location.pathname)
  }, [location])

  return <>{children}</>
}
