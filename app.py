import numpy as np
import holidays
import joblib
from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model # type: ignore
from keras.saving import register_keras_serializable # type: ignore
import tensorflow as tf
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler # type: ignore
from random import randint

# Регистрация кастомной функции потерь
from tensorflow.keras.losses import MeanSquaredError # type: ignore

@register_keras_serializable()
def mse(y_true, y_pred):
    return MeanSquaredError()(y_true, y_pred)

# Регистрация кастомной метрики
@register_keras_serializable()
class CustomMAE(tf.keras.metrics.Metric):
    def __init__(self, name='custom_mae', **kwargs):
        super().__init__(name=name, **kwargs)
        self.mae = tf.keras.metrics.MeanAbsoluteError()

    def update_state(self, y_true, y_pred, sample_weight=None):
        return self.mae.update_state(y_true, y_pred, sample_weight)

    def result(self):
        return self.mae.result()

app = Flask(__name__)

# Загрузка модели с кастомными объектами
model = tf.keras.models.load_model(
    'model.h5',
    custom_objects={
        'mse': mse,
        'mae': tf.keras.metrics.MeanAbsoluteError(),
        'custom_mae': CustomMAE
    }
)
scaler = joblib.load('scaler.pkl')
ru_holidays = holidays.CountryHoliday('RU')

location_map = {
    'Университет': 0,
    'Офис': 1,
    'Торговый центр': 2,
    'Железнодорожный вокзал': 3,
    'МФЦ': 4
}

def get_additional_features(today):
    year = today.year
    month = today.month
    day = today.day
    day_of_week = today.weekday()
    season = (month % 12 + 3) // 3
    is_holiday = 1 if today in ru_holidays else 0
    return [day_of_week, season, is_holiday, year, month, day]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/page-2')
def page_2():
    return render_template('page-2.html')

@app.route('/page-3', methods=['POST'])
def page_3():
    try:
        # Извлекаем данные из формы
        location = request.form.get('location')
        daily_traffic = int(request.form.get('daily_traffic'))
        is_advertised = int(request.form.get('is_advertised'))
        num_coffee_types = int(request.form.get('num_coffee_types'))
        average_price_per_cup = float(request.form.get('average_price_per_cup'))

        # Преобразуем локацию в числовой формат
        location_encoded = location_map.get(location, -1)
        if location_encoded == -1:
            return render_template('page-3.html', error="Invalid location selected.")

        # Дополнительные признаки
        today = datetime.today()

        # Формируем входные данные
        user_input_list = [100, location_encoded, daily_traffic, is_advertised, num_coffee_types, average_price_per_cup]
        user_data = np.array(user_input_list).reshape(1, -1)

        prediction_list = []

        # Генерируем данные для 7 дней вперед
        date_range = [today + timedelta(days=i) for i in range(1, 8)]
        for date in date_range:
            additional_features = np.array(get_additional_features(date)).reshape(1, -1)

            full_data = np.concatenate((user_data, additional_features), axis=1)

            # Стандартизация данных
            full_data_scaled = scaler.transform(full_data)

            # Предсказание с помощью модели
            prediction = model.predict(full_data_scaled)
            prediction_list.append(int((prediction[0][0]) / 4 * randint(0.8, 1.3))

        max_sales = np.max(prediction_list)
        min_sales = np.min(prediction_list)

        # Используем индекс для получения соответствующей даты из date_range
        max_date = date_range[prediction_list.index(max_sales)].strftime("%d-%m-%Y")
        min_date = date_range[prediction_list.index(min_sales)].strftime("%d-%m-%Y")

        result = {
            "max_date": max_date,
            "min_date": min_date,
            "max_sales": max_sales,
            "min_sales": min_sales
        }

        return render_template('page-3.html', result=result)

    except Exception as e:
        return render_template('page-3.html', result=0)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
