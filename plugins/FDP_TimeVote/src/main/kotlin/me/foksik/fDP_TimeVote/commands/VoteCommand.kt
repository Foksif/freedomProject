package me.foksik.fDP_TimeVote.commands
import me.foksik.fDP_TimeVote.VoteManager
import me.foksik.fDP_TimeVote.utils.ChatUtil.message
import org.bukkit.command.Command
import org.bukkit.command.CommandExecutor
import org.bukkit.command.CommandSender
import org.bukkit.entity.Player

class VoteCommand(private val voteManager: VoteManager) : CommandExecutor {

    override fun onCommand(sender: CommandSender, command: Command, label: String, args: Array<String>): Boolean {
        if (sender is Player) {
            if (args.isNotEmpty()) {
                when (args[0].lowercase()) {
                    "yes" -> voteManager.voteYes(sender)
                    "no" -> voteManager.voteNo(sender)
                    else -> sender.message("&cИспользуйте /vote yes или /vote no.")
                }
            } else {
                sender.message("&cИспользуйте /vote yes или /vote no.")
            }
        } else {
            sender.message("&cТолько игроки могут голосовать.")
        }
        return true
    }
}