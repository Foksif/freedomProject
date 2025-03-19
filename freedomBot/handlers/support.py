from aiogram import Router, types
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from config import ADMIN_IDS
from keyboards import menu_keyboard, exit_support_keyboard

router = Router()

class SupportState(StatesGroup):
    waiting_for_message = State()

user_states = {}
user_messages = {}

@router.message(lambda msg: msg.text == "📞 Техподдержка")
async def enter_support(message: types.Message, state: FSMContext):
    user_states[message.from_user.id] = message.from_user.id
    await state.set_state(SupportState.waiting_for_message)
    await message.answer("Вы в режиме техподдержки. Напишите свой вопрос.", reply_markup=exit_support_keyboard)

@router.message(lambda msg: msg.text == "❌ Выйти из техподдержки")
async def exit_support(message: types.Message, state: FSMContext):
    user_states.pop(message.from_user.id, None)
    user_messages.pop(message.from_user.id, None)
    await state.clear()
    await message.answer("Вы вышли из техподдержки.", reply_markup=menu_keyboard)

@router.message(SupportState.waiting_for_message)
async def forward_to_admin(message: types.Message):
    if message.from_user.id in user_states:
        for admin_id in ADMIN_IDS:
            caption_text = f"📩 Сообщение от {message.from_user.full_name} (ID: {message.from_user.id})"

            if message.text:
                sent_message = await message.bot.send_message(
                    admin_id,
                    f"{caption_text}:\n{message.text}",
                    reply_markup=types.ForceReply(selective=True)
                )
            elif message.photo:
                caption = message.caption if message.caption else "Фото без подписи."
                sent_message = await message.bot.send_photo(
                    admin_id, message.photo[-1].file_id,
                    caption=f"{caption_text}: \n{caption}",
                    reply_markup=types.ForceReply(selective=True)
                )
            elif message.document:
                caption = message.caption if message.caption else "Документ без подписи."
                sent_message = await message.bot.send_document(
                    admin_id, message.document.file_id,
                    caption=f"{caption_text}: \n{caption}",
                    reply_markup=types.ForceReply(selective=True)
                )
            elif message.video:
                caption = message.caption if message.caption else "Видео без подписи."
                sent_message = await message.bot.send_video(
                    admin_id, message.video.file_id,
                    caption=f"{caption_text}: \n{caption}",
                    reply_markup=types.ForceReply(selective=True)
                )
            elif message.voice:
                caption = message.caption if message.caption else "Голосовое сообщение без подписи."
                sent_message = await message.bot.send_voice(
                    admin_id, message.voice.file_id,
                    caption=f"{caption_text}: \n{caption}",
                    reply_markup=types.ForceReply(selective=True)
                )
            elif message.sticker:
                sent_message = await message.bot.send_sticker(
                    admin_id, message.sticker.file_id,
                    reply_markup=types.ForceReply(selective=True)
                )
            else:
                sent_message = await message.bot.send_message(
                    admin_id,
                    f"{caption_text}:\n{message.text}",
                    reply_markup=types.ForceReply(selective=True)
                )

            user_messages[message.from_user.id] = sent_message.message_id

        await message.answer("Ваше сообщение отправлено в техподдержку.")

@router.message(lambda msg: msg.chat.id in ADMIN_IDS)
async def admin_reply(message: types.Message):
    if message.reply_to_message:
        original_message = message.reply_to_message
        user_id = None

        for uid, message_id in user_messages.items():
            if message_id == original_message.message_id:
                user_id = uid
                break

        if user_id:
            caption = message.caption if message.caption else "Сообщение без подписи."

            if message.text:
                await message.bot.send_message(user_id, f"👨‍💻 Сообщение от поддержки:\n{message.text}")
            elif message.photo:
                await message.bot.send_photo(
                    user_id, message.photo[-1].file_id,
                    caption=f"👨‍💻 Сообщение от поддержки:\n{caption}"
                )
            elif message.document:
                await message.bot.send_document(
                    user_id, message.document.file_id,
                    caption=f"👨‍💻 Сообщение от поддержки:\n{caption}"
                )
            elif message.video:
                await message.bot.send_video(
                    user_id, message.video.file_id,
                    caption=f"👨‍💻 Сообщение от поддержки:\n{caption}"
                )
            elif message.voice:
                await message.bot.send_voice(
                    user_id, message.voice.file_id,
                    caption=f"👨‍💻 Сообщение от поддержки:\n{caption}"
                )
            elif message.sticker:
                await message.bot.send_sticker(
                    user_id, message.sticker.file_id
                )
        else:
            await message.answer("⚠ Не удалось найти пользователя для ответа.")
