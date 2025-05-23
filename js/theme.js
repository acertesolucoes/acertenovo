// Gerenciamento de tema claro/escuro
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há preferência salva
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Aplicar tema salvo ou usar preferência do sistema
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Configurar botão de alternância de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Aplicar novo tema
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Atualizar ícone
            updateThemeIcon(newTheme);
        });
    }
    
    // Atualizar ícone do botão de tema
    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-sun-fill';
            } else {
                themeIcon.className = 'bi bi-moon-fill';
            }
        }
    }
    
    // Ouvir mudanças na preferência do sistema
    prefersDarkScheme.addEventListener('change', function(e) {
        // Só aplicar se o usuário não tiver uma preferência salva
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
});
