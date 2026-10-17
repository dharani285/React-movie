import "../css/MovieCard.css";

function MovieCard({ movie }) {
    if (!movie) return null;

    function onFavoriteClick() {
        alert("clicked");
    }

    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={imageUrl}
                    alt={movie.title}
                    onError={(e) => {
                        e.target.src =
                            "https://via.placeholder.com/500x750?text=No+Image";
                    }}
                />

                <div className="movie-overlay">
                    <button className="favorite-btn" onClick={onFavoriteClick}>
                        ❤️
                    </button>
                </div>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>
                    {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "N/A"}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;