package me.foksik.fDP_apiCheck

import org.bukkit.Bukkit
import org.bukkit.ChatColor
import org.bukkit.entity.Player
import org.bukkit.plugin.java.JavaPlugin
import java.util.concurrent.ConcurrentHashMap

class KickScheduler(private val plugin: JavaPlugin, private val apiManager: APIManager) {
    private var countdownTaskId: Int = -1
    private val countdownTimes = ConcurrentHashMap<Player, Int>()
    private var wasAPIDown = false

    fun startKickCountdown() {
        // Если таймер уже запущен, ничего не делаем
        if (countdownTaskId != -1) return

        wasAPIDown = true
        val players = Bukkit.getOnlinePlayers()

        // Если нет игроков онлайн, не запускаем таймер
        if (players.isEmpty()) return

        countdownTaskId = Bukkit.getScheduler().scheduleSyncRepeatingTask(
            plugin,
            {
                val currentPlayers = Bukkit.getOnlinePlayers()

                // Если API снова доступно, отменяем кик
                if (apiManager.isAPIAvailable()) {
                    cancelKickCountdown()
                    currentPlayers.forEach {
                        it.sendMessage("${ChatColor.GREEN}Соединение с API восстановлено! Кик отменен.")
                    }
                    wasAPIDown = false
                    return@scheduleSyncRepeatingTask
                }

                // Обновляем таймер для каждого игрока
                currentPlayers.forEach { player ->
                    if (!countdownTimes.containsKey(player)) {
                        // Новый игрок (если был телепорт между серверами или другой сценарий)
                        countdownTimes[player] = 60
                        player.sendMessage("${ChatColor.RED}Внимание! Потеряно соединение с API. Сервер отключит всех игроков через 1 минуту, если соединение не восстановится.")
                    } else {
                        val currentTime = countdownTimes[player]!!
                        countdownTimes[player] = currentTime - 1

                        when (currentTime) {
                            60 -> player.sendMessage("${ChatColor.RED}Внимание! Потеряно соединение с API. Сервер отключит всех игроков через 1 минуту, если соединение не восстановится.")
                            30 -> player.sendMessage("${ChatColor.RED}До отключения сервера осталось 30 секунд!")
                            15 -> player.sendMessage("${ChatColor.RED}До отключения сервера осталось 15 секунд!")
                            10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ->
                                player.sendMessage("${ChatColor.RED}До отключения сервера осталось $currentTime секунд!")
                            0 -> {
                                player.kickPlayer("Сервер временно недоступен из-за потери соединения с API. Пожалуйста, попробуйте подключиться позже.")
                                countdownTimes.remove(player)
                            }
                        }
                    }
                }

                // Удаляем игроков, которые уже были отключены
                countdownTimes.keys.removeIf { !it.isOnline }

                // Если все игроки отключены, останавливаем таймер
                if (countdownTimes.isEmpty()) {
                    cancelKickCountdown()
                }
            },
            0L,
            20L // Каждую секунду
        )
    }

    fun cancelKickCountdown() {
        if (countdownTaskId != -1) {
            Bukkit.getScheduler().cancelTask(countdownTaskId)
            countdownTaskId = -1
            countdownTimes.clear()
        }
    }

    fun isAPIDown(): Boolean = wasAPIDown
}