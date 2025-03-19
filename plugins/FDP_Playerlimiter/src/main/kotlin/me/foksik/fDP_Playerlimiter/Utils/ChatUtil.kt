package me.foksik.fDP_Playerlimiter.Utils

import org.bukkit.ChatColor

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
}