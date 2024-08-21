'use client';
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import popcornImage from '@/public/images/popcorn-rating.svg'

function AddMovie (){
    const [addingForm, setAddingForm] = useState({
        poster: '',
        title: '',
        duration: '',
        year: '',
        genre: [],
        director: [],
        actors: [],
        trailerUrl: '',
        averageRating: '',
        resume: '',
    });

    const [numberActorInputs, setNumberActorInputs] = useState(1);
    const [numberDirectorInputs, setNumberDirectorInputs] = useState(1);
    const [numberGenreInputs, setNumberGenreInputs] = useState(1);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // callback function pour le hover d'un icône rating.
    const handleMouseEnter = (index) => setHoveredIndex(index);

    // callback function pour la fin du hover d'un icône rating.
    const handleMouseLeave = () => setHoveredIndex(null);

    // callback function pour le click d'un icône rating.
    const handleRatingClick = (ratingValue) => {
        setAddingForm({
            ...addingForm,
            averageRating: ratingValue,
        });
    };
    
    const handleSubmitMovieForm = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', {addingForm});
        // Envoyer les données à une API ou un service
    };
    
    const generateFormInput = (inputName, placeholder, type) => {
        return (
            <input 
                className='box-content w-fit w-72 px-2 py-1 rounded-lg' 
                type={type} 
                name={inputName}
                value={addingForm[inputName]}
                onChange={(e) => 
                    setAddingForm({
                        ...addingForm,
                        [inputName]: e.target.value,
                    })} 
                placeholder={placeholder}
            />
        )
    };
        
    const handleGenerationFieldInput = (setNameFieldInput, nameFielInput) => setNameFieldInput(nameFielInput + 1);

    const generateArrayInputs = (numberOfInputs, name, placeholder, type) => {
        const arrayOfInput = [];
        for(let i = 0; i < numberOfInputs; i++){
            arrayOfInput.push(<input 
                className='box-content w-fit px-2 py-1 rounded-lg' 
                key={i} 
                type={type} 
                name={name}
                value={addingForm[name[i]]} 
                onBlur={(e) =>{
                    let arrayForm = [...addingForm[name]]; // Copier le tableau
                    arrayForm.splice(i, 1, e.target.value);
                    setAddingForm({
                        ...addingForm,
                        [name]: arrayForm,
                    })
                }} 
                placeholder={placeholder}/>)
        }
        return arrayOfInput;
    };

    // Fonction générant les icônes suivant la note du film sur 5
    const renderPopcornIcons = (number) => {

        // initialisation d'un array qui prendra les icônes en stockage
        const icons = [];

        //Initialisation de la valeur de currRating
        let currRating = addingForm.ratings >= 0 ? addingForm.ratings : 0

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
                    onClick={(e) =>{
                        e.preventDefault(); 
                        handleRatingClick(i + 1)
                    }}

                    // Au survol le numéro de l'icône sera enregistrer en tant que hoveredIndex
                    onMouseEnter={() => handleMouseEnter(i)}

                    // Quand le survole dépassera la souris alors la fonction callback handleMouseLeave
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        // Si le useState indexrating est présent alors il prendra la comparaison iconClass pour la couleur des icônes si il fera référence a la fonction pour la coloration en fonction du hover des icônes.
                        className={`${addingForm.ratings ? iconClass : (isColored ? '' : 'grayscale')} transition ease-in-out duration-300`}
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
        <div className="w-full max-w-[1240px] min-h-[600px] h-fit rounded-lg border-2 border-[#444141] bg-[#131313] backdrop-blur-sm">
            <form className='flex flex-col' onSubmit={handleSubmitMovieForm}>
                <div className="flex text-black">
                    {addingForm.poster ? (
                    <label htmlFor="imageMovie">
                        <div className="relative w-[333px] h-[500px]">
                                <Image
                                    className='rounded-xl object-cover'
                                    src={URL.createObjectURL(addingForm.poster)}
                                    alt="Input image"
                                    fill
                                    sizes="(max-width: 768px) 100vw"
                                />
                        </div>
                    </label>
                    ) : (
                        <label className='flex w-[333px] h-[500px] justify-center items-center rounded-lg bg-slate-50' htmlFor="imageMovie">
                            <div className="flex flex-col">
                                <FontAwesomeIcon className='text-9xl' icon={faImage} />
                                <p className="text-center">Add an image</p>
                            </div>
                    </label>
                    )}
                    <input
                        className="hidden"
                        id="imageMovie"
                        type="file" 
                        name="imageMovie" 
                        onChange={(e) => 
                        setAddingForm({
                            ...addingForm,
                            poster: e.target.files[0],
                        })
                    }/>
                    <div className="flex flex-col min-w-[600px] gap-2.5">
                        {generateFormInput("title", "Title...", "text")}
                        {generateFormInput("duration", "Duration...", "number")}
                        {generateFormInput("year", "Year release...", "number")}
                        <div className="flex gap-2">
                            {generateArrayInputs(numberGenreInputs, 'genre', "Genre...", "text")}
                            <button 
                                className='box-content w-fit px-2 py-1 rounded-lg bg-slate-50'
                                onClick={(e) =>{
                                    e.preventDefault(); 
                                    handleGenerationFieldInput(setNumberGenreInputs, numberGenreInputs)
                                }}>
                                More Genre
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {generateArrayInputs(numberDirectorInputs, 'director', "Director...", "text")}
                            <button 
                                className='box-content w-fit px-2 py-1 rounded-lg bg-slate-50' 
                                onClick={(e) =>{ 
                                    e.preventDefault(); 
                                    handleGenerationFieldInput(setNumberDirectorInputs, numberDirectorInputs)
                                }}>
                                More Director
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {generateArrayInputs(numberActorInputs, 'actors', "Actor...", "text")}
                            <button 
                                className='box-content w-fit px-2 py-1 rounded-lg bg-slate-50' 
                                onClick={(e) =>{
                                    e.preventDefault(); 
                                    handleGenerationFieldInput(setNumberActorInputs, numberActorInputs)
                                }}>
                                More Actor
                            </button>
                        </div>
                        <textarea className="resize-none box-content w-[500px] py-2 min-h-[90px] max-h-fit" name="resume" onChange={(e) => setAddingForm({
                            ...addingForm,
                            resume: e.target.value
                        })}/>
                        <div>
                            <div className="flex items-center">
                                {renderPopcornIcons(5)}
                            </div>
                            {generateFormInput("trailerUrl", "Add Trailer", "text")}
                        </div>
                    </div>
                </div>
                <button className="h-10 px-3 rounded-3xl bg-red-800 text-xl hover:bg-opacity-70 transition ease-in-out duration-300" type="submit">Submit</button>
            </form>
        </div>
    )

}

export default AddMovie;