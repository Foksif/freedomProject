package me.foksik.fDP_Items.commands

import me.foksik.fDP_Items.items.SuperBow
import org.bukkit.command.Command
import org.bukkit.command.CommandExecutor
import org.bukkit.command.CommandSender
import org.bukkit.entity.Player

class GiveCommand : CommandExecutor {
    override fun onCommand(
        sender: CommandSender,
        command: Command,
        label: String,
        args: Array<out String>
    ): Boolean {
        if (sender !is Player) {
            sender.sendMessage("Only players can use this command!")
            return true
        }

        if (!sender.hasPermission("fdpitems.command")) {
            sender.sendMessage("§cYou don't have permission to use this command!")
            return true
        }

        if (args.isEmpty() || args.size < 2) {
            sender.sendMessage("§cUsage: /fdpitems give <item>")
            return true
        }

        when (args[0].lowercase()) {
            "give" -> {
                when (args[1].lowercase()) {
                    "superbow" -> {
                        sender.inventory.addItem(SuperBow.create())
                        sender.sendMessage("§aYou received a Super Bow!")
                    }
                    else -> {
                        sender.sendMessage("§cUnknown item: ${args[1]}")
                        sender.sendMessage("§cAvailable items: superbow")
                    }
                }
            }
            else -> {
                sender.sendMessage("§cUnknown subcommand: ${args[0]}")
                sender.sendMessage("§cAvailable subcommands: give")
            }
        }

        return true
    }
}