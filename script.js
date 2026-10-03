console.log("VIGILIA iniciado");

const root = document.documentElement;

// ── Menú móvil ────────────────────────────────────────────────────────
// No depende de Motion: funciona aunque el CDN no cargue.
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// ── Animaciones (Motion) ──────────────────────────────────────────────
// Import dinámico: si el CDN falla, el resto de la página sigue funcionando
// y el timeout del <head> vuelve a mostrar los elementos ocultos.
if (root.classList.contains("motion")) {
  import("https://cdn.jsdelivr.net/npm/motion@11/+esm").then(({ animate, inView, scroll }) => {
    window.__motionOK = true;
    // Si algo de la animación falla, se muestra todo en vez de dejarlo oculto.
    window.addEventListener("error", () => root.classList.remove("motion"));
    const ease = [0.22, 1, 0.36, 1];

    // Anima la entrada y al terminar limpia los estilos inline,
    // para que los :hover y transiciones de CSS sigan funcionando.
    function reveal(el, delay, distance = 32) {
      el.style.transition = "none";
      animate(
        el,
        { opacity: [0, 1], translate: [`0 ${distance}px`, "0 0"] },
        { duration: 0.8, delay, ease }
      ).then(() => {
        el.classList.add("is-in");
        el.style.opacity = "";
        el.style.translate = "";
        void el.offsetWidth;
        el.style.transition = "";
      });
    }

    // Hero: entrada escalonada al cargar
    document.querySelectorAll(".hero [data-reveal]").forEach((el, i) => reveal(el, 0.1 + i * 0.1));

    // Resto: cada elemento aparece al entrar en pantalla; los hermanos
    // que entran juntos (cards de una grilla) van en cascada.
    let batch = [];
    let scheduled = false;
    inView(
      "main [data-reveal]",
      (info) => {
        // Motion 11 entrega el IntersectionObserverEntry; versiones nuevas, el elemento.
        batch.push(info instanceof Element ? info : info.target);
        if (!scheduled) {
          scheduled = true;
          requestAnimationFrame(() => {
            batch.forEach((item, i) => reveal(item, i * 0.07));
            batch = [];
            scheduled = false;
          });
        }
      },
      { amount: 0.2 }
    );

    // Foto del hero: se acerca suavemente al hacer scroll (como en apple.com)
    const heroImg = document.querySelector(".hero-media img");
    scroll(animate(heroImg, { scale: [1.12, 1] }, { ease: "linear" }), {
      target: document.querySelector(".hero-media"),
      offset: ["start end", "end end"],
    });

    // Foto de emergencias: leve parallax
    const nightImg = document.querySelector(".emergency-bg");
    scroll(animate(nightImg, { scale: [1.15, 1.15], translate: ["0 -6%", "0 6%"] }, { ease: "linear" }), {
      target: document.querySelector(".emergency"),
      offset: ["start end", "end start"],
    });
  });
}
