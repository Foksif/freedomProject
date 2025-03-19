from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


menu_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="ℹ️ Информация о сервере"), KeyboardButton(text="📞 Техподдержка")],
        [KeyboardButton(text="🖥 Статус сервера")]
    ],
    resize_keyboard=True
)

exit_support_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="❌ Выйти из техподдержки")]
    ],
    resize_keyboard=True
)
