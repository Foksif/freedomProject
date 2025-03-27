package me.foksik.fDP_CommandBlocker

import me.foksik.fDP_CommandBlocker.listener.CommandBlockListener
import org.bukkit.plugin.java.JavaPlugin

class FDP_CommandBlocker : JavaPlugin() {
    override fun onEnable() {
        saveDefaultConfig()

        server.pluginManager.registerEvents(CommandBlockListener(this), this)

        logger.info("CommandBlocker Plugin включен.")
    }

    override fun onDisable() {
        logger.info("CommandBlocker Plugin выключен.")
    }


    fun getBlockedCommands(): List<String> {
        return config.getStringList("blocked-commands").map { it.trim().lowercase() }
    }
}
