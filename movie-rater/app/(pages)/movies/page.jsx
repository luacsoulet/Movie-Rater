'use client'
import Modal from 'react-modal';
import { useState } from "react";
import InfoModal from "@/app/components/ui/infoModal";
import Card from "@/app/components/ui/card";
import MoviesData from '@/public/data.json'

Modal.setAppElement('#app');

function Movies(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // UseState pour la récupération des datas du film selectionné
    const [isMovieData, setIsMovieData] = useState([]);
    
    // Sélection des données des films dans le fichier .json de test
    const data = MoviesData.films;

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

    return(
        <main id='appq'>
            <div className='flex flex-col mb-[250px] w-full content-center items-center gap-10 text-white'>
                <div className='text-center mt-10 text-xl font-medium'>MOVIES</div>
                <div className='flex justify-center max-w-custom w-full flex-wrap gap-8 gap-y-8'>
                    {
                        data.map((el) => (
                            <Card
                                key={el.id}
                                id={el.id}
                                title={el.title}
                                year={el.year}
                                averageRating={el.averageRating}
                                poster={el.poster}
                                onMovieSelect={handleMovieSelect}
                            />
                        ))
                    }
                </div>
            </div>
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

export default Movies