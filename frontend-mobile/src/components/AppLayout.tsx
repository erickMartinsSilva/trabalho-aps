import { useState, type ReactNode } from 'react'
import { BottomNav, type NavTab } from '@/components/BottomNav'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  activeTab?: NavTab
  onTabChange?: (tab: NavTab) => void
  children: ReactNode
  className?: string
}

export function AppLayout({
  activeTab: activeTabProp,
  onTabChange,
  children,
  className,
}: AppLayoutProps) {
  const [internalTab, setInternalTab] = useState<NavTab>('home')
  const activeTab = activeTabProp ?? internalTab
  const handleTabChange = (tab: NavTab) => {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className={cn('flex flex-col min-h-svh bg-background', className)}>
      <main id="main-content" className="flex-1 overflow-y-auto">
        {children}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
