import asyncio
from aiogram import Bot, Dispatcher
from config import TOKEN
from handlers import start, support

async def main():
    bot = Bot(token=TOKEN)
    dp = Dispatcher()

    dp.include_router(start.router)
    dp.include_router(support.router)

    print("✅ Бот запущен и готов к работе!")

    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
