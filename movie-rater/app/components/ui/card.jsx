import Image from "next/image"

function Card({title, year, rating, poster}){
    return(
        <div>
            <Image 
                src={poster}
                label="Image"
                width={200}
                height={275}
            />
            <p>{title}</p>
            <p>{year}</p>
            <p>{rating}</p>
        </div>
    )
}

export default Card