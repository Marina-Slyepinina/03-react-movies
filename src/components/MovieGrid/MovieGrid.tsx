import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
    
    return (
    <ul className={css.grid}>
        {movies.map(movie =>            
            <li key={movie.id} onClick={() => onSelect(movie)}>
                <div className={css.card}>
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
            </li>
        )}
    </ul>

    )
}


// Компонент MovieGrid – це список карток фільмів. Він приймає два пропси:
// onSelect – функцію для обробки кліку на картку фільму;
// movies – масив фільмів.
// Компонент MovieGrid має створювати DOM-елемент наступної структури:
// Галерея повинна рендеритися лише тоді, коли є які-небудь завантажені фільми.