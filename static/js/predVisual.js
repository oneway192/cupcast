const ctx = document.getElementById('barChart').getContext('2d');

// Генерация случайных данных
const generateRandomData = () => Array.from({ length: 7 }, () => Math.floor(Math.random() * (45 - 8 + 1)) + 8);

// Функция для правильного склонения слова "чашка"
const getCupWord = (count) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return 'чашка';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'чашки';
    return 'чашек';
};

// Начальные данные
const dates = ['20-12-2024', '21-12-2024', '22-12-2024', '23-12-2024', '24-12-2024', '25-12-2024', '26-12-2024'];
let dataset = generateRandomData();

// Функция обновления данных в квадратах
const updateSquares = () => {
    const maxValue = Math.max(...dataset); // Максимальное значение
    const minValue = Math.min(...dataset); // Минимальное значение
    const maxIndex = dataset.indexOf(maxValue); // Индекс максимального значения
    const minIndex = dataset.indexOf(minValue); // Индекс минимального значения

    // Обновление текста в квадратах с датами и значениями
    document.getElementById('max-date').innerText = `${dates[maxIndex]}`;
    document.getElementById('max-value').innerText = `${maxValue} ${getCupWord(maxValue)}`;
    document.getElementById('min-date').innerText = `${dates[minIndex]}`;
    document.getElementById('min-value').innerText = `${minValue} ${getCupWord(minValue)}`;
};

// Конфигурация графика
const pred = {
    labels: dates,
    datasets: [{
        label: 'Спрос на кофе (в чашках)',
        data: dataset,
        backgroundColor: '#E19009',
        borderRadius: 5,
    }]
};

const options = {
    plugins: {
        legend: {
            labels: {
                color: '#FFFFFF',
                font: {
                    size: 16
                }
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#FFFFFF',
                font: {
                    size: 14
                }
            },
            grid: {
                display: false
            }
        },
        y: {
            ticks: {
                color: '#FFFFFF',
                font: {
                    size: 14
                }
            },
            grid: {
                color: '#FFFFFF40',
            }
        }
    }
};

const barChart = new Chart(ctx, {
    type: 'bar',
    data: pred,
    options: options
});

// Инициализация данных на старте
updateSquares();

// Обновление графика и квадратов
function updateChart() {
    dataset = generateRandomData(); // Генерация новых данных
    barChart.data.datasets[0].data = dataset; // Обновление данных графика
    barChart.update(); // Перерисовка графика
    updateSquares(); // Обновление квадратов
}