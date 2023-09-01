const navList = document.querySelector('.navbar-list');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click',() => {
    const visibility = navList.getAttribute('data-visible')
    if (visibility === "false"){
        navList.setAttribute('data-visible',true);
        navToggle.setAttribute('aria-expanded', true);
    }
    else if(visibility === "true"){
        navList.setAttribute('data-visible',false);
        navToggle.setAttribute('aria-expanded', false);
    }
});


//slider
// document.addEventListener('DOMContentLoaded', function() {
//     var slides = document.querySelectorAll('.slide');
//     const heroSection = document.querySelector('.hero-section');
//     var currentSlide = 0;

//     function showSlide(n) {
//       for (var i = 0; i < slides.length; i++) {
//         slides[i].classList.remove('active');
//       }
      
//       slides[n].classList.add('active');
//     }
  
//     function nextSlide() {
//       currentSlide = (currentSlide + 1) % slides.length;
//       showSlide(currentSlide);
//     }
  
//     setInterval(nextSlide, 3000); // Change slide every 3 seconds
//   });


var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        css.innerHTML += ".text { color:#00ADB5; }";
        document.body.appendChild(css);
    };


//fixed navbar
    window.addEventListener('scroll', function() {
        var header = document.querySelector('.header');
      
        if (window.scrollY > 0) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

//navbar active
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", function() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });
});

// modal
const portfolioContainer = document.querySelector(".work-card-main")

portfolioContainer.addEventListener('click', e => {
    e.preventDefault()

    const modalToggle = e.target.closest(".card-btn")
    if(! modalToggle) return
    const modal = modalToggle.parentNode.parentNode.nextElementSibling
    const closeButton = modal.querySelector('.modal-close-button')

    const modalOpen = _ => {
        modal.classList.add('is-open')
        modal.style.animation = 'modalIn 500ms forwards'
        document.body.style.overflowY = 'hidden';
    }

    const modalClose = _ => {
        modal.classList.remove('is-open')
        modal.removeEventListener('animationend' ,modalClose)
    }
    
    closeButton.addEventListener('click', _ => {
        modal.style.animation = 'modalOut 500ms forwards'
        modal.addEventListener('animationend', modalClose)
        document.body.style.overflowY = 'scroll'
    })

    document.addEventListener('keydown', e => {
        if(e.keyCode === 27){
            modal.style.animation = 'modalOut 500ms forwards'
            modal.addEventListener('animationend', modalClose)
            document.body.style.overflowY = 'scroll'
        }
    })
    modalOpen()
})