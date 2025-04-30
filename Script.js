// Initialize AOS animation library
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  
    // Initialize skill progress bars
    initSkillBars()
  
    // Initialize project filters
    initProjectFilters()
  
    // Initialize form validation
    initFormValidation()
  
    // Initialize scroll events
    initScrollEvents()
  })
  
  // Navbar scroll effect
  function initScrollEvents() {
    const navbar = document.querySelector(".navbar")
    const backToTop = document.querySelector(".back-to-top")
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
        backToTop.classList.add("show")
      } else {
        navbar.classList.remove("scrolled")
        backToTop.classList.remove("show")
      }
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const navbarHeight = document.querySelector(".navbar").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
  
          // Update active nav link
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active")
          })
          this.classList.add("active")
        }
      })
    })
  
    // Back to top button
    backToTop.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Update active nav link on scroll
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll(".nav-link")
  
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }
  
  // Initialize skill progress bars with animation
  function initSkillBars() {
    const progressBars = document.querySelectorAll(".progress-bar")
  
    // Initial state - set width to 0
    progressBars.forEach((bar) => {
      bar.style.width = "0%"
    })
  
    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the skill section is visible, animate the progress bars
            const bar = entry.target
            const targetWidth = bar.getAttribute("aria-valuenow") + "%"
  
            // Delay animation slightly for visual effect
            setTimeout(() => {
              bar.style.width = targetWidth
            }, 200)
  
            // Unobserve after animation
            observer.unobserve(bar)
          }
        })
      },
      { threshold: 0.1 },
    )
  
    // Observe each progress bar
    progressBars.forEach((bar) => {
      observer.observe(bar)
    })
  }
  
  // Project filtering functionality
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectItems = document.querySelectorAll(".project-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        // Filter projects
        projectItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
  
            // Add animation
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 100)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
  
            // Hide after animation
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        })
      })
    })
  }
  
  // Form validation and submission
  function initFormValidation() {
    const contactForm = document.getElementById("contactForm")
    const formStatus = document.getElementById("formStatus")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic form validation
        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const subject = document.getElementById("subject")
        const message = document.getElementById("message")
        let isValid = true
  
        // Reset validation state
        ;[name, email, subject, message].forEach((field) => {
          field.classList.remove("is-invalid")
        })
  
        // Validate name
        if (!name.value.trim()) {
          name.classList.add("is-invalid")
          isValid = false
        }
  
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.value.trim() || !emailRegex.test(email.value)) {
          email.classList.add("is-invalid")
          isValid = false
        }
  
        // Validate subject
        if (!subject.value.trim()) {
          subject.classList.add("is-invalid")
          isValid = false
        }
  
        // Validate message
        if (!message.value.trim()) {
          message.classList.add("is-invalid")
          isValid = false
        }
  
        if (isValid) {
          // Show sending status
          formStatus.className = "form-status alert alert-info"
          formStatus.textContent = "Sending your message..."
  
          // Simulate form submission
          setTimeout(() => {
            // Success message
            formStatus.className = "form-status alert alert-success"
            formStatus.textContent = "Your message has been sent successfully!"
  
            // Reset form
            contactForm.reset()
  
            // Clear success message after 5 seconds
            setTimeout(() => {
              formStatus.textContent = ""
              formStatus.className = "form-status"
            }, 5000)
          }, 1500)
        } else {
          // Error message
          formStatus.className = "form-status alert alert-danger"
          formStatus.textContent = "Please fill in all required fields correctly."
        }
      })
    }
  }
  
  // Add mobile menu functionality
  document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.querySelector(".navbar-toggler")
    const navbarCollapse = document.querySelector(".navbar-collapse")
  
    // Close mobile menu when clicking a nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      })
    })
  
    // Add animation to navbar items
    document.querySelectorAll(".nav-item").forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
      item.classList.add("animated-item")
    })
  })
  
  // Typed.js effect for hero section.
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof Typed !== "undefined") {
      new Typed("h2.hero-text", {
        strings: ["Software Developer", "Web Developer", "A Problem Solver"],
        typeSpeed: 50,
        backSpeed: 80,
        backDelay: 2000,
        loop: true,
      })
    }
  })
  
  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader")
    if (preloader) {
      preloader.classList.add("preloader-hide")
  
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }
  })
  