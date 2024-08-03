import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import popcornImage from '@/public/images/popcorn-rating.svg'

// Props data pour les donnés du film et setIsModalOpen pour savoir si la modal est ouverte depuis le composant
function InfoModal({data, setIsModalOpen}){

    // Valeur de averageRating stocker dans currRating pour faciliter le décompte lors de l'affichage de la note.
    let currRating = data.averageRating;

    // callback function pour la fermeture de la modale.
    const closeModal = () =>{
        setIsModalOpen(false);
    }

    // Fonction générant les icônes suivant la note du film sur 5
    const renderPopcornIcons = (number) => {
        // initialisation d'un array qui prendra les icônes en stockage
        const icons = [];

        for (let i = 0; i < number; i++) {
            currRating -= 1;
            // Push dans l'array icons de l'élément de note
            icons.push(
                <div key={i} style={{ marginLeft: i === 0 ? '0' : '-5px' }}>
                    <Image
                        // si le currRating est inférieur à zéro alors le filtre greysclae de tailwind s'applique sur l'image.
                        className={currRating < 0 ? "grayscale" :""}
                        src={popcornImage}
                        alt="popcorn rate indicator"
                        label="Image"
                        width={60}
                        height={60}
                    />
                </div>
            );
        }
        return icons;
    }

    return(
        <div className='flex items-center gap-8 min-h-[600px] h-fit'>
            <div className='relative w-[333px] h-[500px]'>
                <Image
                    className='rounded-xl object-cover'
                    src={data.poster}
                    alt={data.title}
                    fill
                />
            </div>
            <div className='flex flex-col gap-[8px] w-[720px] text-2xl'>
                <h1 className='text-3xl'>{data.title}</h1>
                <p>{data.duration} min</p>
                <p>{data.year}</p>
                <div className='flex gap-[8px]'>
                    {data.genre.map(el => (
                        <p className='px-[10px] py-[3px] rounded-2xl bg-red-800 bg-opacity-70 text-xl'>{el}</p>
                    ))}
                </div>
                <p>{data.director}</p>
                <div className='flex gap-2'>
                    {data.actors.map(el => (
                        <p className='px-[10px] py-[3px] rounded-2xl bg-gray-600 bg-opacity-90 text-xl'>{el}</p>
                    ))}
                </div>
                <p className='text-xl'>{data.resume}</p>
                <div className='flex items-center justify-between'>
                    <div className="flex items-center">
                        {renderPopcornIcons(5)}
                    </div>
                    <button className='h-10 px-3 rounded-3xl bg-red-800 bg-opacity-70 text-xl'>Watch Trailer</button>
                </div>
            </div>
            <button className="absolute top-4 right-4" onClick={closeModal}><FontAwesomeIcon icon={faXmark} className='text-3xl'/></button>
        </div>
    )
}

export default InfoModal