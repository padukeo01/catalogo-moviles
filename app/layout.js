import './globals.css'

export const metadata = {
  title: 'Catálogo de Dispositivos',
  description: 'Catálogo de dispositivos móviles',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
} 