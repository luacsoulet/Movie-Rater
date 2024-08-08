import Header from './components/ui/header';
import Footer from './components/ui/footer';
import '@/app/styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export const metadata = {
  title: "Movie Rater",
  description: "An app to rate and remember movies you've already watched.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className='flex justify-center max-w-full h-16 border-b border-color-[#9D9393]'>{<Header />}</nav>
        {children}
        <footer className='flex justify-center z-20 fixed bottom-[-75px] w-full'>{<Footer />}</footer>
      </body>
    </html>
  );
}
