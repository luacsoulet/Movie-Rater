import Card from "./components/ui/card";
import MoviesData from '@/public/data.json'

function Home() {

  const data = MoviesData.films;

  const recentMovies = data.sort((a,b) => b.year - a.year).slice(0,5);

  const bestRating = data.sort((a,b) => b.averageRating - a.averageRating).slice(0,5);
  
  return (
    <main className="flex flex-col justify-center items-center text-white gap-10">
      <section className="flex flex-col mt-10 gap-5">
        <h1 className="text-center text-xl font-medium">Latest Movies Added:</h1>
        <div className="flex gap-10">
          {recentMovies.map((el) => (
            <Card 
              key={el.id}
              title={el.title}
              year={el.year}
              averageRating={el.averageRating}
              poster={el.poster}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <h1 className="text-center text-xl font-medium">Best ratings:</h1>
        <div className="flex gap-10">
        {bestRating.map((el) => (
            <Card 
              key={el.id}
              title={el.title}
              year={el.year}
              averageRating={el.averageRating}
              poster={el.poster}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home
