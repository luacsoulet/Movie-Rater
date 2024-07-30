import Image from 'next/image';
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
                        width={30}
                        height={30}
                    />
                </div>
            );
        }
        return icons;
    }

    return(
        <div className='flex'>
            <Image 
                src={data.poster}
                width={300}
                height={450}
                alt={data.title}
            />
            <div>
                <h1>{data.title}</h1>
                <p>{data.duration} min</p>
                <p>{data.year}</p>
                <div>
                    {data.genre.map(el => {
                        <p>{el}</p>
                    })}
                </div>
                <p>{data.director}</p>
                <div>
                    {data.actors.map(el => {
                        <p>{el}</p>
                    })}
                </div>
                <p>{data.resume}</p>
                <div>
                    <div className="flex items-center">
                        {renderPopcornIcons(5)}
                    </div>
                    <button>Watch Trailer</button>
                </div>
            </div>
            <button onClick={closeModal}>Close Modal</button>
        </div>
    )
}

export default InfoModal