import { useState, useEffect } from "react";
import avatarImage from "../images/avatar.webp";
import ebookkExampleImagen from "../images/ebook-example.jpg";
import gitHubIcon from "../images/icons/github.svg";
import globeSolid from "../images/icons/globe-solid.svg";
import Footer from "./Sections/Footer";
import Header from "./Sections/Header";
import CreateBtns from "./Sections/Buttons/Create-Btns";
import "../styles/App.scss";
import Info from "./Sections/Info";
import InfoBtns from "./Sections/Buttons/Info-Btns";
import Preview from "./Sections/Preview";

function App() {
  const [saveProjectSuccess, setSaveProjectSuccess] = useState("");
  const [saveProjectFail, setSaveProjectFail] = useState("");
  //Función guardar form en API

  const HandleCreateProject = () => {
    console.log("has hecho click");

    fetch(
      "https://dev.adalab.es/api/projectCard",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success === false) {
          setSaveProjectFail(
            `Ha sucedido un error al crear la tarjeta: ${responseJson.error}`
            
          );
          setSaveProjectSuccess("");
        } else if (responseJson.success === true) {
          setSaveProjectSuccess(
            `Proyecto subido exitosamente. Puedes verlo <a href="${responseJson.cardURL}" target="_blank">aquí</a>`
          );
          setSaveProjectFail("");
        }
      });
  };

  


  const [info, setInfo] = useState({
    name: "",
    slogan: "",
    repo: "",
    demo: "",
    technologies: "",
    desc: "",
    autor: "",
    job: "",
    image: "",
    photo: "",
  });

  useEffect(() => {
    const info = localStorage.getItem("formInfo");
    if (info) {
      setInfo(JSON.parse(info));
    }
  }, []);

  // Función subir imagenes buttons form en API
  const updateImages = (key, image) => {
    const newInfo = { ...info, [key]: image };
    setInfo(newInfo);
    localStorage.setItem("formInfo", JSON.stringify(newInfo));
  };

  const handleInput = (ev) => {
    console.log(ev.currentTarget);
    const key = ev.currentTarget.name;
    const newInfo = { ...info, [key]: ev.currentTarget.value };
    setInfo(newInfo);
    localStorage.setItem("formInfo", JSON.stringify(newInfo));
  };

  return (
    <div className="container">
      <Header />

      <main className="main">
        <section className="hero">
          <h2 className="title">Proyectos molones</h2>
          <p className="hero__text">
            Escaparate en línea para recoger ideas a través de la tecnología
          </p>
          <a className="button--link" href="./">
            Ver proyectos
          </a>
        </section>
        <Preview info={info}></Preview>
        <form className="addForm">
          <Info info={info} handleInput={handleInput} />
          <fieldset className="addForm__group--upload">
            <InfoBtns infoKey="image" updateImage={updateImages}>
              Subir foto del proyecto
            </InfoBtns>
            <InfoBtns infoKey="photo" updateImage={updateImages}>
              Subir foto de la autora
            </InfoBtns>
            <CreateBtns onClick={HandleCreateProject} >
              Guardar Proyecto
            </CreateBtns>
          </fieldset>
          <div>
      <button onClick={HandleCreateProject}>Guardar proyecto</button>
      {saveProjectFail && <p style={{ color: 'red' }}>{saveProjectFail}</p>}
      {saveProjectSuccess && <p style={{ color: 'green' }} dangerouslySetInnerHTML={{ __html: saveProjectSuccess }} />}
    </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default App;
