'use client'
import Modal from 'react-modal';
import { useState } from "react";
import InfoModal from "./components/ui/infoModal";
import Card from "./components/ui/card";
import MoviesData from '@/public/data.json'

// Définir a quel élément parent la modal sera rattacher
Modal.setAppElement('#app');

function Home() {
  // UseState pour l'ouverture / fermeture de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // UseState pour la récupération des datas du film selectionné
  const [isMovieData, setIsMovieData] = useState([]);
  
  // Sélection des données des films dans le fichier .json de test
  const data = MoviesData.films;

  // Sélection des films par année au plus récent
  const recentMovies = data.sort((a,b) => b.year - a.year).slice(0,5);

  // Sélection des films par note moyenne aux plus hautes
  const bestRating = data.sort((a,b) => b.averageRating - a.averageRating).slice(0,5);


  // Récupération de la props du component child Card pour savoir quel film à été choisi
  const handleMovieSelect = (id) => {

    // Cherche les données suivant l'affiche où l'on a cliqué pour avoir plus d'infos.
    const movieData = data.find(el => el.id === id);

    // Mettre les données du film dans le useState 
    setIsMovieData(movieData);

    // Définir l'ouverture de la modal sur true pour l'afficher
    setIsModalOpen(true);
  };

  // callback function pour définir la fermeture de la modal lors d'un clique en dehors de la modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsMovieData(null);
  };
  
  return (
    <main className="flex flex-col justify-center items-center text-white gap-10" id='app'>
      <section className="flex flex-col mt-10 gap-5 w-full max-w-custom">
        <h1 className="text-center text-xl font-medium">Latest Movies Added:</h1>
        <div className="flex justify-center gap-8">
          {/* Génération des Card pour les films les plus récents */}
          {recentMovies.map((el) => (
            <Card 
              key={el.id}
              id={el.id}
              title={el.title}
              year={el.year}
              averageRating={el.averageRating}
              poster={el.poster}
              onMovieSelect={handleMovieSelect}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-5 w-full max-w-custom mb-[250px]">
        <h1 className="text-center text-xl font-medium">Best ratings:</h1>
        <div className="flex gap-10 justify-center">
        {/* Génération des Card pour les films les mieux notés */}
        {bestRating.map((el) => (
            <Card 
              key={el.id}
              id={el.id}
              title={el.title}
              year={el.year}
              averageRating={el.averageRating}
              poster={el.poster}
              // onMovieSelect vas servir à faire passer la propriété true de isModalOpen si le bouton plus de la card est cliqué
              onMovieSelect={handleMovieSelect}
            />
          ))}
        </div>
      </section>
      {/* si le useState isModalOpen = true alors la modal s'affiche avec comme contenue le component InfoModal */}
      {isModalOpen && isMovieData &&(
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className="mt-[140px] p-4 shadow-lg mx-auto my-8 w-full max-w-[1240px] rounded-lg bg-[#131313] bg-opacity-80 backdrop-blur-sm text-white" // Ajoutez vos classes Tailwind ici
          overlayClassName="fixed inset-0 bg-black bg-opacity-20"
        >
          {/* Props setIsModalOpen vas servir à savoir si la modal est ouverte ou pas depuis le composant InfoModal*/}
          <InfoModal data={isMovieData} setIsModalOpen={setIsModalOpen}/>
        </Modal>
      )}
    </main>
  );
}

export default Home
