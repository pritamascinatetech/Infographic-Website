// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './globals.css'; // Optional: your own global CSS

export const metadata = {
  title: 'Bootstrap 5 in Next.js 15',
  description: 'Demo using Bootstrap 5 in App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
