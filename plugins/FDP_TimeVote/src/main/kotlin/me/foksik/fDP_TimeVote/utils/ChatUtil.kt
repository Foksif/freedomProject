package me.foksik.fDP_TimeVote.utils

import org.bukkit.Bukkit
import org.bukkit.ChatColor
import org.bukkit.command.CommandSender

object ChatUtil {
    private const val PREFIX = "&7[&bVoteTime&7] &r"

    fun format(text: String, vararg args: Pair<String, String>): String {
        return ChatColor.translateAlternateColorCodes('&', applyArgs(text, *args))
    }

    private fun applyArgs(text: String, vararg args: Pair<String, String>): String {
        var result = text
        for (arg in args) {
            result = result.replace(arg.first, arg.second)
        }
        return result
    }

    fun CommandSender.prefixedMessage(msg: String, vararg args: Pair<String, String>) {
        sendMessage(format("$PREFIX$msg", *args))
    }

    fun CommandSender.error(msg: String, vararg args: Pair<String, String>) {
        sendMessage(format("$PREFIX&c$msg", *args))
    }

    fun CommandSender.message(msg: String, vararg args: Pair<String, String>) {
        sendMessage(format(msg, *args))
    }

    fun broadcast(msg: String, vararg args: Pair<String, String>) {
        Bukkit.getOnlinePlayers().forEach { it.prefixedMessage(msg, *args) }
    }

}