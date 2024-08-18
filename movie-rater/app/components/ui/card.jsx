import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBookmark } from "@fortawesome/free-solid-svg-icons";
import renderPopcornIcons from "./utils";

function Card({id ,title, year, averageRating, poster, onMovieSelect}){
    
    // Callback function qui envoie en tant que props au composant parent pour avoir l'id du film sélectionner.
    const MovieSelectId =() => {
        onMovieSelect(id)
    }

    return(
        <div className="h-[350px] w-[250px] group relative content-end rounded-lg overflow-hidden">
            <Image
                className="rounded-lg group-hover:scale-125 transition ease-in-out duration-500"
                src={poster}
                alt={`${title}-image`}
                label="Image"
                fill
                sizes="(max-width: 768px) 100vw"
                style={{ objectFit: 'cover' }}
            />
            <div className="flex flex-col content-end p-2.5 gap-1">
            <button className="absolute top-2 right-2 flex justify-center items-center w-8 h-8 text-xl rounded-3xl bg-[#131313] bg-opacity-50 backdrop-blur-sm hover:text-red-500 transition ease-in-out duration-200"><FontAwesomeIcon className="text-center text-base" icon={faBookmark} /></button>
                <p className="w-fit h-fit px-2 py-1 rounded-lg bg-[#131313] bg-opacity-50 backdrop-blur-sm" >{title}</p>
                <p className="w-fit h-fit px-2 py-1 rounded-lg bg-[#131313] bg-opacity-50 backdrop-blur-sm">{year}</p>
                <div className="flex justify-between items-center">
                    <div className="w-fit h-fit py-1 rounded-lg bg-[#131313] bg-opacity-50 backdrop-blur-sm">
                        <div className="flex items-center">
                            {renderPopcornIcons(5, averageRating)}
                        </div>
                    </div>
                    <button className="flex justify-center items-center w-8 h-8 text-xl rounded-3xl bg-[#131313] bg-opacity-50 backdrop-blur-sm hover:scale-125 transition ease-in-out duration-200" onClick={MovieSelectId} aria-label="Afficher plus d'informations sur le film lors du clique"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>
        </div>
    )
}

export default Card