import React, { useContext, useRef, useState } from "react";
import "../social.css";
import { UsuarioContext } from "../context/UsuarioProvider";
import { MdAttachFile, MdOutlineThumbUpAlt } from "react-icons/md";
import { PublicacionContext } from "../context/PublicacionProvider";
import utils from "../utils/utils.js";

const URL = "http://localhost:3001/api/v1/publicacion/subir";

const Social = () => {
  const user = useContext(UsuarioContext);
  const publics = useContext(PublicacionContext);
  const idUser = parseInt(localStorage.getItem("user-data"));

  const [publicacion, setPublicacion] = useState({
    texto: "",
    imagen: null,
    fecha: utils.cortadorFecha(new Date().toISOString().toString()),
    likes: 0,
    idUser,
  });

  function handleSubmit(e) {
    const { fecha, idUser, imagen, likes, texto } = publicacion;
    const data = new FormData();
    data.append("imgpublic", imagen);
    data.append("texto", texto);
    data.append("fecha", fecha);
    data.append("likes", likes);
    data.append("idUser", idUser);

    verificarDatos(publicacion, data);
  }

  function verificarDatos({ texto, fecha, likes, idUser, imagen }, data) {
    if (
      texto.trim().length > 0 &&
      fecha &&
      likes >= 0 &&
      idUser != 0 &&
      imagen
    ) {
      requestPublicacion(data);
    } else {
      console.log("No completo");
    }
  }

  async function requestPublicacion(data) {
    const response = await fetch(URL, {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      location.reload();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
  }

  function handleChangeImage(e) {
    const { name } = e.target;
    const file = e.target.files[0];
    setPublicacion({ ...publicacion, [name]: file });
  }

  return (
    <section className="social">
      <div className="social-container">
        <div className="social-section1"></div>
        <div className="social-section2">
          <div className="social-entrada">
            <div className="social-entrada-img">
              <img src={user.imagen} alt="" width="40px" />
            </div>
            <div className="social-entrada-input">
              <textarea
                name="texto"
                onChange={handleChange}
                id=""
                placeholder={`Escribe algo aqui ${user.nombre}...`}
                cols="0"
                rows="3"
              ></textarea>
              <label htmlFor="file-upload" className="label-custom-entrada">
                <MdAttachFile className="clip" /> <span> Subir Imagen </span>
              </label>
              <input
                id="file-upload"
                name="imagen"
                onChange={handleChangeImage}
                className="custom-entrada"
                type="file"
              />
            </div>
            <div className="social-entrada-btn">
              <button type="button" onClick={handleSubmit}>
                Subir
              </button>
            </div>
          </div>
          <hr />
          <div className="social-articles">
            <div className="social-article-content">
              {publics.map((v, i) => (
                <ItemCard key={i} v={v} />
              ))}
            </div>
          </div>
        </div>
        <div className="social-section3"></div>
      </div>
    </section>
  );
};

const ItemCard = ({ v}) => {

  return (
    <div className="social-card">
      <div className="social-card-header">
        <div className="social-card-img">
          <img src={v.imgUser} width={20} alt="" />
        </div>
        <div className="social-card-desc">
          <p>{v.nombre}</p>
          <p>{utils.cortadorFecha(v.fecha)}</p>
        </div>
      </div>
      <div className="social-card-body">
        <p>{v.texto}</p>
        <div className="social-body-img">
          <img src={v.imagen} alt="" />
        </div>
      </div>
      {/* <div className="social-card-footer"><Likes verficado={false} /></div> */}
    </div>
  );
};

const Likes = ({verficado}) => {

  const [verific, setVerific] = useState(verficado);

  const classAnim = verific == true ? "social-like-img animacion-check" : "social-like-img";

  function handleCheckClick(e) {
    setVerific(!verific); 
    document.getElementById("like").checked = verific;
  }

  return (
    <div className="social-card-like">
      <label htmlFor="like" className="social-like-label">
        <div className="social-like-content">
          <MdOutlineThumbUpAlt className={classAnim} id="imgcheck" />
        </div>
      </label>
      <input
        type="checkbox"
        onChange={handleCheckClick}
        id="like"
        className="social-like-check"
      />
    </div>
  );
};

export default Social;
