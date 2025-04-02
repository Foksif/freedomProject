package me.foksik.fDP_apiCheck

import org.bukkit.Bukkit
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.player.PlayerLoginEvent
import org.bukkit.plugin.java.JavaPlugin
import java.util.concurrent.TimeUnit

class FDP_apiCheck : JavaPlugin(), Listener {

    private lateinit var apiManager: APIManager
    private lateinit var kickScheduler: KickScheduler

    override fun onEnable() {
        // Инициализация менеджера API
        apiManager = APIManager(this)

        // Инициализация планировщика киков
        kickScheduler = KickScheduler(this, apiManager)

        // Регистрация ивентов
        server.pluginManager.registerEvents(this, this)

        // Запуск периодической проверки соединения с API
        Bukkit.getScheduler().runTaskTimerAsynchronously(
            this,
            Runnable { checkAPIAndHandlePlayers() },  // Explicitly use Runnable
            0L,
            TimeUnit.SECONDS.toMillis(10) / 50 // Проверка каждые 10 секунд
        )

        logger.info("APICheck включен и мониторит соединение с API")
    }

    @EventHandler
    fun onPlayerLogin(event: PlayerLoginEvent) {
        if (!apiManager.isAPIAvailable()) {
            event.disallow(
                PlayerLoginEvent.Result.KICK_OTHER,
                "Сервер временно недоступен из-за проблем с API. Пожалуйста, попробуйте позже."
            )
            logger.info("Игрок ${event.player.name} не допущен на сервер: API недоступно")
        }
    }

    private fun checkAPIAndHandlePlayers() {
        if (!apiManager.isAPIAvailable()) {
            kickScheduler.startKickCountdown()
        } else {
            kickScheduler.cancelKickCountdown()
        }
    }

    override fun onDisable() {
        kickScheduler.cancelKickCountdown()
        logger.info("APICheck выключен")
    }
}
