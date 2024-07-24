export const metadata = {
  title: "Movie Rater",
  description: "An app to rate and remember movies you've already watched.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
