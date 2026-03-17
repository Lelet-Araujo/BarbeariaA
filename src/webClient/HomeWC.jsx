// HomeWC.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeWC.css";
import { FaCut, FaUserTie, FaTint, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(sec => observer.observe(sec));
  }, []);

  const scrollCarousel = (direction, selector) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const scrollAmount = 320;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const cortes = [
    { nome: " ", img: "https://i.pinimg.com/1200x/ba/ea/af/baeaafaa1cd139bf5bf5869805937ceb.jpg" },
    { nome: " ", img:"https://i.pinimg.com/736x/a7/f7/19/a7f719caf713dfe03c15d4b851d77a96.jpg"},
    { nome: " ", img: "https://i.pinimg.com/736x/e3/9f/10/e39f10f4b8fcd40efccc44262e5d6424.jpg"  },
    { nome: " ", img: "https://i.pinimg.com/1200x/31/5e/59/315e59983bea0209169d3de385f9c73d.jpg" },
    { nome: " ", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1" },
    { nome: " ", img: "https://i.pinimg.com/1200x/0c/59/98/0c59982f3362f6fae59e9838bb1cf178.jpg" }
  ];

  const galeria = [
    "https://i.pinimg.com/1200x/ea/46/b7/ea46b793817412b7003bfb1224748955.jpg",
    "https://i.pinimg.com/736x/4d/82/ce/4d82ceb22591f78a15126389adb4ebb4.jpg",
    "https://i.pinimg.com/736x/39/d0/ca/39d0ca0ff2775e57515175e3a9683436.jpg",
    "https://i.pinimg.com/736x/f2/b5/1d/f2b51db79f287f10a547bcde9173b1ce.jpg",
    "https://i.pinimg.com/1200x/51/ee/5a/51ee5acfd19a8a56782d31c62e20805a.jpg",
    "https://i.pinimg.com/1200x/ea/46/b7/ea46b793817412b7003bfb1224748955.jpg",
    "https://i.pinimg.com/736x/4d/82/ce/4d82ceb22591f78a15126389adb4ebb4.jpg",
    "https://i.pinimg.com/736x/39/d0/ca/39d0ca0ff2775e57515175e3a9683436.jpg",
    "https://i.pinimg.com/736x/f2/b5/1d/f2b51db79f287f10a547bcde9173b1ce.jpg",
    "https://i.pinimg.com/1200x/51/ee/5a/51ee5acfd19a8a56782d31c62e20805a.jpg"
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">LogoBarbearia</div>
        <button onClick={() => navigate("/agenda")}>Agendar</button>
      </nav>

      {/* Hero */}
      <section className="hero fade-in">
        <h1>Lorem ipsum dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        <button onClick={() => navigate("/agenda")}>Agendar Agora</button>
      </section>

      {/* Trabalhos */}
      <section className="cuts fade-in">
        <h2>Nossos Trabalhos</h2>

        <div className="carousel">
          <button onClick={() => scrollCarousel("left", ".cuts-container")}>◀</button>

          <div className="carousel-container cuts-container">
            {cortes.map((corte, i) => (
              <div className="cut-card" key={i}>
                <img
                  src={`${corte.img}?auto=format&fit=crop&w=400&q=80`}
                  alt={corte.nome}
                />
                <p>{corte.nome}</p>
              </div>
            ))}
          </div>

          <button onClick={() => scrollCarousel("right", ".cuts-container")}>▶</button>
        </div>
      </section>

      {/* Sobre */}
      <section className="gallery fade-in">
        <h2>Sobre nós</h2>

        <p className="about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Suspendisse vitae lacus nec velit facilisis tincidunt. 
          Nulla facilisi. Sed ut perspiciatis unde omnis iste natus error 
          sit voluptatem accusantium doloremque laudantium. 
          Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
        </p>

        <div className="carousel">
          <button onClick={() => scrollCarousel("left", ".gallery-container")}>◀</button>

          <div className="carousel-container gallery-container">
            {galeria.map((img, i) => (
              <img
                key={i}
                src={`${img}?auto=format&fit=crop&w=400&q=80`}
                alt="Barbearia"
              />
            ))}
          </div>

          <button onClick={() => scrollCarousel("right", ".gallery-container")}>▶</button>
        </div>
      </section>

      {/* Serviços */}
      <section className="services fade-in">
        <h2>Nossos Serviços</h2>

        <div className="services-cards">
          <div className="card"><FaCut size={40} /><p>Corte</p></div>
          <div className="card"><FaUserTie size={40} /><p>Barba</p></div>
          <div className="card"><FaTint size={40} /><p>Tintura</p></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer fade-in">
        <div className="footer-content">
          <p className="footer-contact">📞 (00) 00000-0000</p>
          <p className="footer-address">📍 Rua Exemplo, 123 - Centro, Sua Cidade - DF</p>
          <div className="social-icons">
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>
      </footer>
    </>
  );
}