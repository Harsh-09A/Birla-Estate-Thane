// Elements
const menuTrigger = document.getElementById("menuTrigger");
const mobileNav = document.getElementById("mobileNav");
const backdrop = document.getElementById("backdrop");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
const allNavLinks = document.querySelectorAll(".nav-link");
const floatingHeader = document.querySelector(".floating-header");

let isMenuOpen = false;

// Menu Toggle Function
function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  menuTrigger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  backdrop.classList.toggle("active");

  if (isMenuOpen) {
    // Animate menu items in
    gsap.to(mobileNavItems, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out",
    });

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  } else {
    // Animate menu items out
    gsap.to(mobileNavItems, {
      opacity: 0,
      x: 30,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
    });

    // Restore body scroll
    document.body.style.overflow = "";
  }
}

// Event Listeners
menuTrigger.addEventListener("click", toggleMenu);
backdrop.addEventListener("click", toggleMenu);

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  });
});

// Scroll effect for header
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    floatingHeader.classList.add("scrolled");
  } else {
    floatingHeader.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// GSAP Initial Animation
gsap.from(".glass-container", {
  y: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.2,
});

// Subtle hover animations for desktop nav pills
const desktopNavLinks = document.querySelectorAll(".nav-link-desktop");
desktopNavLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Initialize Bootstrap ScrollSpy
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#main-navbar",
  rootMargin: "0px 0px -50%",
  smoothScroll: true,
  offset: 100,
});

// Listen for activate events from ScrollSpy
const navLinks = document.querySelectorAll("#main-navbar .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("activate.bs.scrollspy", function (event) {
    // This event fires on the specific link that becomes active
    console.log("Activated:", this.getAttribute("href"));
  });
});

// Alternative: Listen on body for all scrollspy activations
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 150; // Offset for fixed header

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active from all links
      allNavLinks.forEach((link) => link.classList.remove("active"));

      // Add active to matching links
      allNavLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
