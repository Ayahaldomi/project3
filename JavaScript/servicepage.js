
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card1');

    cards.forEach(card1 => {
        card1.addEventListener('mouseover', () => {
            const textOverlay = card1.querySelector('.text-overlay');
            textOverlay.style.opacity = '1';
            
            card1.style.transform = 'scale(1.02)';
            card1.style.transition = '0.3s ease';
        });

        card1.addEventListener('mouseout', () => {
            const textOverlay = card1.querySelector('.text-overlay');
            textOverlay.style.opacity = '0';
            card1.style.transform = 'scale(1)';
            card1.style.transition = '0.3s ease';
        });
    });
});