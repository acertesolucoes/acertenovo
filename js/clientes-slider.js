// Controle do slider de clientes
document.addEventListener('DOMContentLoaded', function() {
    const clienteCards = document.querySelectorAll('.cliente-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalCards = clienteCards.length;
    
    // Função para mostrar o card atual e esconder os demais
    function showCard(index) {
        // Esconde todos os cards
        clienteCards.forEach(card => {
            card.classList.remove('active');
            card.classList.add('hidden');
        });
        
        // Mostra apenas o card atual
        clienteCards[index].classList.remove('hidden');
        clienteCards[index].classList.add('active');
        
        // Atualiza o índice atual
        currentIndex = index;
    }
    
    // Evento para o botão anterior
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = totalCards - 1; // Volta para o último card se estiver no primeiro
        }
        showCard(newIndex);
    });
    
    // Evento para o botão próximo
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalCards) {
            newIndex = 0; // Volta para o primeiro card se estiver no último
        }
        showCard(newIndex);
    });
    
    // Inicializa mostrando o primeiro card
    showCard(0);
});
