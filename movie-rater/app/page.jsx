import Card from "./components/ui/card";
import MoviesData from '@/public/data.json'

function Home() {

  const data = MoviesData.films;

  const recentMovies = data.sort((a,b) => b.year - a.year).slice(0,5);

  const bestRating = data.sort((a,b) => b.rating - a.rating).slice(0,5);
  
  return (
    <main className="flex flex-col justify-center items-center text-white gap-11">
      <section className="mt-16">
        <h1 className="text-lg font-extrabold">Latest Movies Added:</h1>
        <div className="flex">
          {recentMovies.map((el) => (
            <Card 
              key={el.id}
              title={el.title}
              year={el.year}
              rating={el.rating}
              poster={el.poster}
            />
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-lg font-extrabold">Best ratings:</h1>
        <div className="flex">
        {bestRating.map((el) => (
            <Card 
              key={el.id}
              title={el.title}
              year={el.year}
              rating={el.rating}
              poster={el.poster}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home
