import { Link } from 'react-router-dom'

function PageNotFound() {

  return (
    <>
      <div id="container">
        <img src="/images/op.svg" alt="One Piece logo" id="logo" />
        <p>Erreur 404 - One Piece introuvable ! <br/>
          Cette île n'est sûrement pas Laugh Tale :( <br/>
          Retourner vers le <Link to="/">Sunny</Link>
        </p>
      </div>
    </>
  )
}

export default PageNotFound
