import TelegramLoginDebug from '@/components/TelegramLoginDebug'

export default function DebugAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-title font-bold mb-4">Debug Telegram Auth</h1>
        <p className="text-text-secondary mb-6">
          This will show what data the new bot sends
        </p>
        
        <TelegramLoginDebug />
        
        <div className="mt-6 text-xs text-text-secondary">
          <p>After clicking login, check:</p>
          <p>1. Browser console (F12)</p>
          <p>2. Alert with your Telegram ID</p>
        </div>
      </div>
    </div>
  )
}