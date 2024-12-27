document.addEventListener('DOMContentLoaded', function() {
    const choiceGroups = document.querySelectorAll('.choice-group');

    choiceGroups.forEach(group => {
        group.addEventListener('click', function() {
            const circle = group.querySelector('.choice-circle');
            const text = group.querySelector('.choice-text');
            const isSelected = circle.src.includes('../static/images/choose-chosen.svg');

            // Снимаем выбор у всех групп
            choiceGroups.forEach(g => {
                const gCircle = g.querySelector('.choice-circle');
                const gText = g.querySelector('.choice-text');
                gCircle.src = '../static/images/choose-not-chosen.svg';
                gText.style.color = '#FFFFFF';
            });

            // Если группа уже выбрана, снимаем выбор
            if (isSelected) {
                circle.src = '../static/images/choose-not-chosen.svg';
                text.style.color = '#FFFFFF';
            } else {
                // Иначе устанавливаем выбор для текущей группы
                circle.src = '../static/images/choose-chosen.svg';
                text.style.color = '#F2E2C9';
            }
        });
    });
});


