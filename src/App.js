import axios from "axios";
import Movie from "./Movie";
import "./App.css"
import React from "react";

class App extends React.Component {
  state = {
    isLoding: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data: {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoding: false});
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoding, movies } = this.state;
    return(
      <div>
        <div className="topbar">
           <div className="topbar__text h">Test Movie Site</div>
           <div className="topbar__text up">가입하기</div>
           <div className="topbar__text in">로그인</div>
           <div className="topbar__text s">검색하기 🔍 </div>
        </div>
      <section className="container">
        {isLoding ? (
          <div className="loder">
            <span className="loder__text">로딩중..냉장중..인중..ㅎㅎ</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
      </div>
    )
  }
}
export default App;