import FeedComponent from '@/components/FeedComponent'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function HomePage() {
  return (
    <ErrorBoundary>
      <FeedComponent />
    </ErrorBoundary>
  )
}