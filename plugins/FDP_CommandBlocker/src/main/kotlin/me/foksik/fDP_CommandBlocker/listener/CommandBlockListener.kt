package me.foksik.fDP_CommandBlocker.listener

import me.foksik.fDP_CommandBlocker.FDP_CommandBlocker
import me.foksik.fDP_CommandBlocker.listener.utils.ChatUtil
import org.bukkit.Bukkit
import org.bukkit.event.Listener
import org.bukkit.event.EventHandler
import org.bukkit.event.player.PlayerCommandPreprocessEvent

class CommandBlockListener(private val plugin: FDP_CommandBlocker) : Listener {

    private val blockedCommands: List<String> by lazy { plugin.getBlockedCommands() }
    private val commandBlockedMessage: String by lazy { plugin.config.getString("messages.command-blocked", "&cЭта команда запрещена на этом сервере.").toString()  }
    private val adminNotifyMessage: String by lazy { plugin.config.getString("messages.admin-notify", "&cИгрок {player} попытался выполнить заблокированную команду: /{command}").toString() }

    @EventHandler
    fun onPlayerCommand(event: PlayerCommandPreprocessEvent) {
        val command = event.message.split(" ")[0].substring(1).lowercase()

        if (event.player.isOp || event.player.name == "CONSOLE") {
            return
        }

        if (command in blockedCommands) {
            Bukkit.getOnlinePlayers().filter { it.hasPermission("fdp.commandblocker.notify") }.forEach {
                val formattedMessage = ChatUtil.format(adminNotifyMessage, "player" to event.player.name, "command" to command)
                it.sendMessage(formattedMessage)
            }

            val formattedPlayerMessage = ChatUtil.format(commandBlockedMessage)
            event.isCancelled = true
            event.player.sendMessage(formattedPlayerMessage)
        }
    }
}
