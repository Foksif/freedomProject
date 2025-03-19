package me.foksik.fDP_Playerlimiter

import me.foksik.fDP_Playerlimiter.Utils.ChatUtil
import org.bukkit.Bukkit
import org.bukkit.configuration.file.FileConfiguration
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.player.PlayerLoginEvent
import org.bukkit.plugin.java.JavaPlugin

class FDP_Playerlimiter : JavaPlugin(), Listener {
    private var maxPlayers: Int = 0
    private var allowedPermission: String = ""
    private var kickMessage: String = ""

    override fun onEnable() {
        saveDefaultConfig()
        loadConfig()
        server.pluginManager.registerEvents(this, this)

        logger.info("FDP_Playerlimiter успешно запущенн")
    }

    private fun loadConfig() {
        val config: FileConfiguration = config
        maxPlayers = config.getInt("max-players", 50)
        allowedPermission = config.getString("allowed-permission", "fdp.playerlimit.bypass") ?: "playerlimit.bypass"

        val kickMessageList = config.getStringList("kick-message")
        kickMessage = kickMessageList.joinToString("\n") { ChatUtil.format(it) }
    }

    override fun onDisable() {
        logger.info("FDP_Playerlimiter успешно выключен")
    }

    @EventHandler
    fun onPlayerLogin(event: PlayerLoginEvent) {
        val onlinePlayers = Bukkit.getOnlinePlayers().size

        if (onlinePlayers >= maxPlayers && !event.player.hasPermission(allowedPermission)) {
            event.disallow(PlayerLoginEvent.Result.KICK_FULL, kickMessage)
        }
    }
}
