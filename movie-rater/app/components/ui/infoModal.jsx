'use client'
import { useState } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import popcornImage from '@/public/images/popcorn-rating.svg'

// Props data pour les donnés du film et setIsModalOpen pour savoir si la modal est ouverte depuis le composant
function InfoModal({data, setIsModalOpen}){
    
    const [isTrailerShow, setIsTrailerShow ] = useState(false)
    const [indexRating, setIndexRating] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // callback function pour la fermeture de la modale.
    const closeModal = () => {
        setIsModalOpen(false);
        setIsTrailerShow(false)
    }

    // callback function pour afficher le trailer.
    const handleShowTrailer = () => {
        setIsTrailerShow(true)
    }

    // callback function pour cacher le trailer.
    const handleHideTrailer = () => {
        setIsTrailerShow(false)
    }

    // callback function pour le hover d'un icône rating.
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    // callback function pour la fin du hover d'un icône rating.
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    // callback function pour le click d'un icône rating.
    const handleRatingClick = (ratingValue) => {
        setIndexRating(ratingValue)
    }

    // Fonction générant les icônes suivant la note du film sur 5
    const renderPopcornIcons = (number) => {

        // initialisation d'un array qui prendra les icônes en stockage
        const icons = [];

        //Initialisation de la valeur de currRating
        let currRating = indexRating >= 0 ? indexRating : 0

        for (let i = 0; i < number; i++) {
            
            // Mise à jour de la valeur de currRating
            currRating -= 1;

            // élément de comparaison sur hoveredIndex pour return une boolean sur ses deux conditions
            const isColored = hoveredIndex !== null && i <= hoveredIndex;

            // élément de comparaison sur currRating est supérieur à zéro alors l'élément aura aucun filtre
            const iconClass = currRating < 0 ? "grayscale" : "";

            // Push dans l'array icons de l'élément de note
            icons.push(
                <button 
                    key={i} 

                    style={{ marginLeft: i === 0 ? '0' : '-5px' }}

                    // Au click le numéro de l'icône + 1 sera enregistrer en tant que indexRating
                    onClick={() => handleRatingClick(i + 1)}

                    // Au survol le numéro de l'icône sera enregistrer en tant que hoveredIndex
                    onMouseEnter={() => handleMouseEnter(i)}

                    // Quand le survole dépassera la souris alors la fonction callback handleMouseLeave
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        // Si le useState indexrating est présent alors il prendra la comparaison iconClass pour la couleur des icônes si il fera référence a la fonction pour la coloration en fonction du hover des icônes.
                        className={`${indexRating ? iconClass : (isColored ? '' : 'grayscale')} transition ease-in-out duration-300`}
                        src={popcornImage}
                        width={60}
                        height={60}
                        alt="popcorn rate indicator"
                    />
                </button>
            );
        }
        return icons;
    }

    
    return (
        <div className='flex items-center gap-8 min-h-[600px] h-fit'>
            {isTrailerShow ? (
                <div className='flex flex-col rounded-xl w-full items-center gap-3'>
                <ReactPlayer
                    url={data.trailerUrl} controls={true} height='600px' width='90%'
                />
                <button className='absolute top-4 left-4' aria-label="Retourner à la fenêtre d'informations du film" onClick={handleHideTrailer}><FontAwesomeIcon icon={faArrowLeft} className='text-3xl' /></button>
                <button className="absolute top-4 right-4" onClick={closeModal} aria-label="Fermer la fenêtre d'informations du film"><FontAwesomeIcon icon={faXmark} className='text-3xl'/></button>
            </div>
            ) : (
                <>
                    <div className='relative w-[333px] h-[500px]'>
                        <Image
                            className='rounded-xl object-cover'
                            src={data.poster}
                            alt={data.title}
                            fill
                            sizes="(max-width: 768px) 100vw"
                        />
                    </div>
                    <div className='flex flex-col gap-[8px] w-[720px] text-2xl'>
                        <h1 className='text-3xl'>{data.title}</h1>
                        <p>{data.duration} min</p>
                        <p>{data.year}</p>
                        <div className='flex gap-[8px]'>
                            {data.genre.map((el, index) => (
                                <p key={index} className='px-[10px] py-[3px] rounded-2xl bg-red-800 text-xl hover:bg-opacity-70 transition ease-in-out duration-300'>{el}</p>
                            ))}
                        </div>
                        <p>{data.director}</p>
                        <div className='flex gap-2'>
                            {data.actors.map((el, index) => (
                                <p key={index} className='px-[10px] py-[3px] rounded-2xl bg-gray-500 text-xl hover:bg-gray-600 transition ease-in-out duration-300'>{el}</p>
                            ))}
                        </div>
                        <p className='text-xl'>{data.resume}</p>
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center">
                                {renderPopcornIcons(5)}
                            </div>
                            <button className='h-10 px-3 rounded-3xl bg-red-800 text-xl hover:bg-opacity-70 transition ease-in-out duration-300' onClick={handleShowTrailer}>Watch Trailer</button>
                        </div>
                    </div>
                    <button className="absolute top-4 right-4" onClick={closeModal} aria-label="Fermer la fenêtre d'informations du film"><FontAwesomeIcon icon={faXmark} className='text-3xl'/></button>
                </>
            )}
        </div>
    )
}

export default InfoModal;