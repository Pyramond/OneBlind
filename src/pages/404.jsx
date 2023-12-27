import NavigationBar from '../react-components/navbar/navbar'

function PageNotFound() {

  return (
    <>
      <NavigationBar />
      <div id="container">
        <img src="/images/op.svg" alt="One Piece logo" id="logo" />
        <p>Erreur 404 - One Piece introuvable ! <br/>
          Cette île n'est sûrement pas Laugh Tale :( <br/>
          Retourner vers le <a href='/'>Sunny</a>
        </p>
      </div>
    </>
  )
}

export default PageNotFound
