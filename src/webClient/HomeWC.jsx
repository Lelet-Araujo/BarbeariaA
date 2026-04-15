import React, { useEffect, useRef, useState } from "react";
import "./HomeWC.css";
import CardAgendaLoja from "../2Components/CardAgendamentoLoja/CardAgendaLoja";
import NovoContainer from "../2Components/CardLogin/Cardlogin";
import { FaCut, FaUserTie, FaTint, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const pageRef = useRef(null);
  const cutsRef = useRef(null);
  const galleryRef = useRef(null);

  const [showAgenda, setShowAgenda] = useState(false);
  const [showNovo, setShowNovo] = useState(false);

  useEffect(() => {
    const sections = pageRef.current?.querySelectorAll(".fade-in");
    if (!sections?.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollCarousel = (direction, ref) => {
    const container = ref.current;
    if (!container) return;

    const firstItem = container.firstElementChild;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");

    const scrollAmount = firstItem
      ? firstItem.getBoundingClientRect().width + gap
      : container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const cortes = [
    { img: "https://i.pinimg.com/1200x/ba/ea/af/baeaafaa1cd139bf5bf5869805937ceb.jpg" },
    { img: "https://i.pinimg.com/736x/a7/f7/19/a7f719caf713dfe03c15d4b851d77a96.jpg" },
    { img: "https://i.pinimg.com/736x/e3/9f/10/e39f10f4b8fcd40efccc44262e5d6424.jpg" },
    { img: "https://i.pinimg.com/1200x/31/5e/59/315e59983bea0209169d3de385f9c73d.jpg" },
    { img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1" },
    { img: "https://i.pinimg.com/1200x/0c/59/98/0c59982f3362f6fae59e9838bb1cf178.jpg" },
  ];

  const galeria = [
    "https://i.pinimg.com/1200x/ea/46/b7/ea46b793817412b7003bfb1224748955.jpg",
    "https://i.pinimg.com/736x/4d/82/ce/4d82ceb22591f78a15126389adb4ebb4.jpg",
    "https://i.pinimg.com/736x/39/d0/ca/39d0ca0ff2775e57515175e3a9683436.jpg",
    "https://i.pinimg.com/736x/f2/b5/1d/f2b51db79f287f10a547bcde9173b1ce.jpg",
    "https://i.pinimg.com/1200x/51/ee/5a/51ee5acfd19a8a56782d31c62e20805a.jpg",
  ];

  return (
    <div className="home-wc" ref={pageRef}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">LogoBarbearia</div>

        <div className="nav-actions">
          <button type="button" onClick={() => setShowAgenda(true)}>
            Agendar
          </button>

          <button type="button" onClick={() => setShowNovo(true)}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero fade-in">
        <div className="hero-content">
          <h1>Lorem ipsum dolor sit amet</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
          <button type="button" onClick={() => setShowAgenda(true)}>
            Agendar Agora
          </button>
        </div>
      </section>

      {/* Trabalhos */}
      <section className="cuts fade-in">
        <h2>Nossos Trabalhos</h2>

        <div className="carousel">
          <button type="button" className="carousel-btn" onClick={() => scrollCarousel("left", cutsRef)}>◀</button>

          <div className="carousel-container cuts-container" ref={cutsRef}>
            {cortes.map((corte, i) => (
              <div className="cut-card" key={i}>
                <img src={corte.img} alt={`Corte ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <button type="button" className="carousel-btn" onClick={() => scrollCarousel("right", cutsRef)}>▶</button>
        </div>
      </section>

      <section className="gallery fade-in">
        <h2>Galeria</h2>
        <div className="carousel">
          <button type="button" className="carousel-btn" onClick={() => scrollCarousel("left", galleryRef)}>◀</button>

          <div className="carousel-container gallery-container" ref={galleryRef}>
            {galeria.map((img, i) => (
              <img key={i} src={img} alt={`Galeria ${i + 1}`} loading="lazy" />
            ))}
          </div>

          <button type="button" className="carousel-btn" onClick={() => scrollCarousel("right", galleryRef)}>▶</button>
        </div>
      </section>

      <section className="services fade-in">
        <h2>Serviços</h2>
        <div className="services-cards">
          <article className="service-card">
            <FaCut size={28} />
            <h3>Corte</h3>
            <p>Cortes modernos e clássicos com acabamento detalhado.</p>
          </article>

          <article className="service-card">
            <FaUserTie size={28} />
            <h3>Barba</h3>
            <p>Modelagem e alinhamento para um visual sempre impecável.</p>
          </article>

          <article className="service-card">
            <FaTint size={28} />
            <h3>Tratamentos</h3>
            <p>Hidratação e cuidados para cabelo e barba com qualidade.</p>
          </article>
        </div>
      </section>

      <section className="about fade-in">
        <h2>Sobre Nós</h2>
        <p className="about-text">
          Nossa barbearia une tradição e estilo em um ambiente moderno, focado
          em atendimento de qualidade e experiência completa para cada cliente.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>Rua Exemplo, 123 - Centro</p>
          <p>Segunda a Sábado: 09h às 20h</p>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </footer>

      {/* Modal Agenda */}
      {showAgenda && (
        <CardAgendaLoja onClose={() => setShowAgenda(false)} />
      )}

      {showNovo && (
        <NovoContainer onClose={() => setShowNovo(false)} />
      )}
    </div>
  );
}
