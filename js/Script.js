document.addEventListener('DOMContentLoaded', function () {
  // === AOS ===
  AOS.init({ duration: 1000, once: false });

  // === Bouton retour en haut ===
  const btn = document.getElementById("btn-top");
  window.addEventListener("scroll", function () {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === Animation header au scroll ===
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // === Navigation active ===
  const sections = document.querySelectorAll("section");
  const navLinksItems = document.querySelectorAll("nav ul li a"); // renommé ici

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinksItems.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  // === Animation section présentation ===
  const presentationSection = document.querySelector('.presentation-section');
  if (presentationSection) {
    const presentationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        presentationSection.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    presentationObserver.observe(presentationSection);
  }

  // === Animation section contact + items ===
  const contactSection = document.querySelector("#contact");
  const contactItems = document.querySelectorAll(".contact-item");

  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        contactSection.classList.toggle("visible", entry.isIntersecting);
      });
    }, { threshold: 0.3 });
    contactObserver.observe(contactSection);
  }

  if (contactItems.length > 0) {
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150);
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, { threshold: 0.2 });

    contactItems.forEach(item => itemObserver.observe(item));
  }

  // === Animation compteurs ===
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 16);

          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // === Animation section partenaires ===
  const partenairesSection = document.querySelector('.partenaires');
  if (partenairesSection) {
    const partenairesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });
    partenairesObserver.observe(partenairesSection);
  }

  // === Soumission du formulaire ===
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch("send.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.text();
        if (response.ok) {
          alert(result);
          form.reset();
        } else {
          alert("Erreur serveur : " + result);
        }
      } catch (error) {
        alert("Erreur de connexion. Veuillez réessayer.");
      }
    });
  }

  // === Menu responsive hamburger ===
  const toggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-links'); // renommé ici

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navMenu.classList.toggle('show');
  });
});
