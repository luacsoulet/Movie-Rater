import AddMovie from "@/app/components/forms/addMovie.jsx";

function AddMovies(){
    return(
        <div className="flex flex-col mb-[250px] w-full content-center items-center gap-10 text-white">
            <h1 className="text-center mt-10 text-xl font-medium">Add Movie</h1>
            <AddMovie />
        </div>
    );
}

export default AddMovies