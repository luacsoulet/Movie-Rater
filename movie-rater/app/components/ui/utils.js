import Image from "next/image";
import popcornImage from '@/public/images/popcorn-rating.svg'

// Fonction générant les icônes suivant la note du film sur 5
export default function renderPopcornIcons(number,averageRating){
    let currRating = averageRating;
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
                    width={35}
                    height={35}
                />
            </div>
        );
    }
    return icons;
}