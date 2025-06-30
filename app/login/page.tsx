import TelegramLogin from '@/components/TelegramLogin'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-title font-bold mb-2">Welcome to Learn2</h1>
        <p className="text-text-secondary mb-8">
          Sign in with Telegram to share and discover what works for your kids
        </p>
        
        <div className="flex justify-center mb-6">
          <TelegramLogin />
        </div>
        
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-text-secondary">OR</span>
          </div>
        </div>
        
        <Link 
          href="/test-auth" 
          className="text-sm text-text-secondary hover:text-primary transition-colors"
        >
          Use test authentication →
        </Link>
      </div>
    </div>
  )
}