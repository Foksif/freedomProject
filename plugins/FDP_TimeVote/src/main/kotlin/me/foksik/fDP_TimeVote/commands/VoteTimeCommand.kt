package me.foksik.fDP_TimeVote.commands
import me.foksik.fDP_TimeVote.VoteManager
import me.foksik.fDP_TimeVote.utils.ChatUtil.error
import me.foksik.fDP_TimeVote.utils.ChatUtil.message
import me.foksik.fDP_TimeVote.utils.ConfigUtil
import org.bukkit.command.Command
import org.bukkit.command.CommandExecutor
import org.bukkit.command.CommandSender
import org.bukkit.entity.Player
import org.bukkit.plugin.java.JavaPlugin

class VoteTimeCommand(private val voteManager: VoteManager, private val plugin: JavaPlugin) : CommandExecutor {
    private val configUtil = ConfigUtil(plugin)

    override fun onCommand(sender: CommandSender, command: Command, label: String, args: Array<String>): Boolean {
        if (sender is Player) {
            if (voteManager.isVoteInProgress()) {
                sender.message(configUtil.config.getString("vote-in-progress").toString())
            } else {
                voteManager.startVote(sender)
            }
        } else {
            sender.error("Только игроки могут начать голосование.")
        }
        return true
    }
}