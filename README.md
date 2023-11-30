<img src="https://i.imgur.com/6MnM57m.jpg" alt="Пример изображения" width="250" height="400">

# Проект "MTS MUSIC"

Добро пожаловать в MUSIC MTS - идеальный стриминговый сервис!

## Установка

Для запуска проекта требуется установить необходимые библиотеки. Воспользуйтесь следующей командой:

```bash
pip install -r "requirements/dev.txt"
```

## Запуск проекта

Перейдите в директорию проекта:

```bash
cd proddroppers
```

Выполните миграции для базы данных:

```bash
python manage.py makemigrations
python manage.py migrate
```

Запустите сервер:

```bash
python manage.py runserver
```

Теперь проект готов к использованию! Откройте ваш веб-браузер и перейдите по адресу [http://localhost:8000/](http://localhost:8000/) чтобы начать работу.

Приятного использования!
