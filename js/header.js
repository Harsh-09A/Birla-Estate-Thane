// Elements
const menuTrigger = document.getElementById("menuTrigger");
const mobileNav = document.getElementById("mobileNav");
const backdrop = document.getElementById("backdrop");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const desktopNavLinks = document.querySelectorAll(".nav-link-desktop");
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

// Close menu when clicking a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Update active state
    mobileNavLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Update desktop active state
    const href = link.getAttribute("href");
    desktopNavLinks.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === href);
    });

    // Close menu
    toggleMenu();
  });
});

// Desktop nav active state
desktopNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Update active state
    desktopNavLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Update mobile active state
    const href = link.getAttribute("href");
    mobileNavLinks.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === href);
    });
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

// Subtle hover animations for nav pills
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
