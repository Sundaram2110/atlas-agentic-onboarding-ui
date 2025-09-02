import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="p-4 lg:p-6 space-y-6">{children}</main>
      </div>
    </div>
  )
}
