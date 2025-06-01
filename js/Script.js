document.addEventListener('DOMContentLoaded', function () {
  // AOS
  AOS.init({
    duration: 1000,
    once: false,
  });

  // Bouton retour en haut
  const btn = document.getElementById("btn-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Animation header au scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Navigation active
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
 const presentationSection = document.querySelector('.presentation-section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      presentationSection.classList.add('visible');
    } else {
      presentationSection.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

observer.observe(presentationSection);



  // Animation section contact + items
  const contactSection = document.querySelector("#contact");
  const contactItems = document.querySelectorAll(".contact-item");

  if (contactSection) {
    const observerOptions = {
      threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactSection.classList.add("visible");
        } else {
          contactSection.classList.remove("visible");
        }
      });
    }, observerOptions);

    sectionObserver.observe(contactSection);
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
    }, {
      threshold: 0.2
    });

    contactItems.forEach(item => {
      itemObserver.observe(item);
    });
  }
});
const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("send.php", {
      method: "POST",
      body: formData,
    })
    .then(response => response.text())
    .then(result => {
      alert(result); // ou afficher dans un div de confirmation
      form.reset();
    })
    .catch(error => {
      alert("Erreur lors de l'envoi.");
    });
  });