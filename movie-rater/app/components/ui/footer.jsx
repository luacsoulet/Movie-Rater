import Image from "next/image"

function Footer(){

    return(
        <Image
            className="bg-gradient-to-t from-[#060505]"
            src="/images/ranger-sieges.svg"
            alt="image d'un siège"
            width={5120}
            height={105}
        />
    )
}

export default Footer