package me.foksik.fDP_CommandBlocker.listener.utils

import org.bukkit.ChatColor
import org.bukkit.command.CommandSender

object ChatUtil {
    fun format(text: String, vararg args: Pair<String, String>): String {
        return ChatColor.translateAlternateColorCodes('&', applyArgs(text, * args))
    }

    private fun applyArgs(text: String, vararg args: Pair<String, String>): String {
        var result = text
        for(arg in args) {
            result = result.replace(arg.first, arg.second)
        }
        return result
    }

    fun CommandSender.message(msg: String, vararg args: Pair<String, String>) {
        sendMessage(format(msg, *args))
    }
}