import './App.scss'
import './Rotate.scss'
import Questions from './components/Questions'

function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <span>Datenbanksysteme</span>
        <h1>Computerspiele</h1>
        <span>Wintersemester 2022/2023</span>
        <p>
          Ein Projekt von Duy Nguyen Le, Otis von Lilien-Waldau, Arthur Goldenbaum & Max Heinrich. © 2023
        </p>
      </div>
      <div className="cp-ct">
        <h2>Datensätze</h2>
        <div className="flex-ct">
          <a href="querydata" className="btn">AOL Querydata</a>
          <a href="platforms" className="btn">Platforms</a>
          <a href="publisher" className="btn">Publisher</a>
          <a href="videogames" className="btn">Videogames</a>
        </div>
      </div>
      <div className="cp-ct">
        <h2>10 Fragen</h2>
        <Questions />
      </div>
    </div>
  )
}

export default App
