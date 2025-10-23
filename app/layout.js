export const metadata = {
  title: 'Baby Food Content Writer | AI-Powered Content Generation',
  description: 'AI-powered content generation for baby food products, nutrition guides, and parenting resources.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
