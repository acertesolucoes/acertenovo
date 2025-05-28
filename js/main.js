// Esperar pelo carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Remover preloader quando a página estiver carregada
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        
        // Ativar animações após o preloader desaparecer
        setTimeout(function() {
            activateAnimations();
            startCounters();
        }, 500);
    });
    
    // Configuração do menu responsivo
    setupMobileMenu();
    
    // Configuração do slider de clientes
    setupClientesSlider();
    
    // Configuração do botão voltar ao topo
    setupBackToTop();
    
    // Configuração do formulário de contato
    setupContactForm();
    
    // Configuração do menu ativo no scroll
    setupScrollSpy();
});

// Função para ativar animações de entrada
function activateAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Função para iniciar contadores de estatísticas
function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current > target) {
                current = target;
                clearInterval(interval);
            }
            counter.textContent = current;
        };
        
        const interval = setInterval(updateCounter, 16);
    });
}

// Função para configurar o menu mobile
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Função para configurar o slider de clientes
function setupClientesSlider() {
    const track = document.querySelector('.clientes-track');
    const cards = document.querySelectorAll('.cliente-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardWidth = cards[0].offsetWidth;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, cards.length - cardsPerView);
    
    // Criar dots de navegação
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Atualizar largura dos cards e quantidade por visualização ao redimensionar
    window.addEventListener('resize', function() {
        cardWidth = cards[0].offsetWidth;
        cardsPerView = getCardsPerView();
        maxIndex = Math.max(0, cards.length - cardsPerView);
        goToSlide(Math.min(currentIndex, maxIndex));
        
        // Atualizar dots
        const dots = document.querySelectorAll('.dot');
        if (dots.length !== maxIndex + 1) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
    });
    
    // Botões de navegação
    prevBtn.addEventListener('click', () => {
        goToSlide(Math.max(0, currentIndex - 1));
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(Math.min(maxIndex, currentIndex + 1));
    });
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        currentIndex = index;
        
        // Atualizar dots ativos
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Função para determinar quantos cards são visíveis por vez
    function getCardsPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth >= 1024) return 3;
        if (viewportWidth >= 768) return 2;
        return 1;
    }
    
    // Auto-play do slider (opcional)
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            goToSlide(nextIndex);
        }, 5000); // Mudar slide a cada 5 segundos
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Iniciar autoplay
    startAutoplay();
    
    // Parar autoplay ao interagir com o slider
    track.addEventListener('mouseenter', stopAutoplay);
    prevBtn.addEventListener('mouseenter', stopAutoplay);
    nextBtn.addEventListener('mouseenter', stopAutoplay);
    dotsContainer.addEventListener('mouseenter', stopAutoplay);
    
    // Retomar autoplay ao parar de interagir
    track.addEventListener('mouseleave', startAutoplay);
    prevBtn.addEventListener('mouseleave', startAutoplay);
    nextBtn.addEventListener('mouseleave', startAutoplay);
    dotsContainer.addEventListener('mouseleave', startAutoplay);
}

// Função para configurar o botão voltar ao topo
function setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Função para configurar o formulário de contato
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Aqui você pode adicionar a lógica de envio do formulário
            // Por exemplo, usando EmailJS ou outra solução
            
            // Exemplo de EmailJS (descomente e configure se necessário)
            
            emailjs.init("jyDe_g_zTovR6_AeA");
            
            const templateParams = {
                categoria: this.categoria.value,
                credito: this.credito.value,
                entrada: this.entrada.value,
                parcelas: this.parcelas.value,
                nome: this.nome.value,
                telefone: this.telefone.value,
                email: this.email.value,
                mensagem: this.mensagem.value
            };
            
            emailjs.send('service_u6inqwz', 'template_j92f7dl', templateParams)
                .then(function() {
                    alert('Mensagem enviada com sucesso!');
                    contactForm.reset();
                }, function(error) {
                    alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
                    console.error('Erro:', error);
                });
            
            
            // Por enquanto, apenas mostrar uma mensagem e limpar o formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }
}

// Função para configurar o menu ativo no scroll
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Função para efeito de header fixo com mudança ao scroll
function setupStickyHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Inicializar o header fixo
setupStickyHeader();
