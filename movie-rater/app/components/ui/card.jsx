import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBookmark } from "@fortawesome/free-solid-svg-icons";
import popcornImage from '@/public/images/popcorn-rating.svg'

function Card({id ,title, year, averageRating, poster, onMovieSelect}){

    // Valeur de averageRating stocker dans currRating pour faciliter le décompte lors de l'affichage de la note.
    let currRating = averageRating;
    
    // Callback function qui envoie en tant que props au composant parent pour avoir l'id du film sélectionner.
    const MovieSelectId =() => {
        onMovieSelect(id)
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
                        width={30}
                        height={30}
                    />
                </div>
            );
        }
        return icons;
    }

    return(
        <div className="h-[350px] w-[250px] relative content-end">
            <Image
                className="rounded-lg"
                src={poster}
                alt={`${title}-image`}
                label="Image"
                fill
                style={{ objectFit: 'cover' }}
            />
            <div className="flex flex-col content-end p-2.5 gap-1">
            <button className="absolute top-2 right-2 flex justify-center items-center w-8 h-8 text-xl rounded-3xl bg-[#131313] bg-opacity-50 backdrop-blur-sm"><FontAwesomeIcon className="text-center text-base" icon={faBookmark} /></button>
                <p className="w-fit h-fit px-2 py-1 rounded-lg bg-[#131313] bg-opacity-50 backdrop-blur-sm" >{title}</p>
                <p className="w-fit h-fit px-2 py-1 rounded-lg bg-[#131313] bg-opacity-50 backdrop-blur-sm">{year}</p>
                <div className="flex justify-between items-center">
                    <div className="w-fit h-fit py-1 rounded-lg bg-[#131313] bg-opacity-50 backdrop-blur-sm">
                        <div className="flex items-center">
                            {renderPopcornIcons(5)}
                        </div>
                    </div>
                    <button className="flex justify-center items-center w-8 h-8 text-xl rounded-3xl bg-[#131313] bg-opacity-50 backdrop-blur-sm" onClick={MovieSelectId}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>
        </div>
    )
}

export default Card