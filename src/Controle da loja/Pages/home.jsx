import "./Home.css";
import NavBar from "../ComponentsCL/NavbarCL/navbarCL";

export default function Home() {
  return (
    <>
      <NavBar />

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            Agendamento online
          </span>

          <h1>
            Seu corte perfeito <br />
            começa aqui.
          </h1>

          <p>
            Agende seu horário em poucos cliques e
            tenha uma experiência moderna e organizada.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Agendar agora</button>
            <button className="btn-secondary">Ver serviços</button>
          </div>

        </div>

      </section>




    </>
  );
}