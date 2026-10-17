import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                console.log("Popularmovies",popularMovies);
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            const results = await searchMovies(searchQuery);
            console.log("Search movies",results);

            setMovies(results);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}

            <div className="movies-grid">
                {!loading && movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                ) : (
                    !loading && <p>No movies found</p>
                )}
            </div>
        </div>
    );
}

export default Home;