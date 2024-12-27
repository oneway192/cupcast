const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // Измените метки по своему усмотрству
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Ошибка на обучении',
                    data: [2.6757, 2.6730, 2.6798, 2.6763, 2.6746, 2.6798, 2.6765, 2.6598, 2.6689, 2.6726, 2.6603, 2.6664, 2.6630, 2.6714, 2.6772, 2.6752, 2.6639], // Замените эти значения на свои
                    borderColor: '#F2E2C9',
                    backgroundColor: 'rgba(242, 226, 201, 0.2)',
                    borderWidth: 2,
                    fill: true,
                },
                {
                    label: 'Ошибка на валидации',
                    data: [2.6802, 2.6785, 2.6651, 2.6751, 2.6652, 2.6601, 2.6668, 2.6660, 2.6678, 2.6700, 2.6630, 2.6661, 2.6683, 2.6638, 2.6656, 2.6646, 2.6694], // Замените эти значения на свои
                    borderColor: '#E19009',
                    backgroundColor: 'rgba(225, 144, 9, 0.2)',
                    borderWidth: 2,
                    fill: true,
                }
            ]
        };
    
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#FFFFFF', // Установите цвет легенд на белый
                        },
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Эпохи', // Измените текст по своему усмотрению
                            color: '#FFFFFF', // Установите цвет подписи оси X на белый
                        },
                        ticks: {
                            color: '#FFFFFF', // Установите цвет отметок на оси X на белый
                        },
                    },
                    y: {
                        title: {
                            display: false, // Уберите подпись оси Y
                        },
                        ticks: {
                            color: '#FFFFFF', // Установите цвет отметок на оси Y на белый
                        },
                    },
                },
            },
        };
    // Создание графика
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );