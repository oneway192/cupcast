# Используем официальный образ Python
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл requirements.txt в контейнер
COPY requirements.txt /app/

# Устанавливаем зависимости из requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# Устанавливаем Gunicorn для продакшн-сервера
RUN pip install gunicorn

# Копируем остальные файлы проекта в контейнер
COPY . .

# Открываем порт для приложения
EXPOSE 5000

# Команда для запуска приложения с использованием Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
