package me.foksik.fDP_TimeVote

import me.foksik.fDP_TimeVote.utils.ChatUtil
import me.foksik.fDP_TimeVote.utils.ConfigUtil
import net.md_5.bungee.api.chat.ClickEvent
import net.md_5.bungee.api.chat.TextComponent
import org.bukkit.Bukkit
import org.bukkit.Sound
import org.bukkit.entity.Player
import org.bukkit.scheduler.BukkitRunnable

class VoteManager(private val plugin: FDP_TimeVote) {
    private val configUtil = ConfigUtil(plugin)
    private val voteDuration = configUtil.config.getInt("vote.duration", 60)
    private val requiredPercentage = configUtil.config.getInt("vote.required-percentage", 60)

    private val votesYes = mutableSetOf<Player>()
    private val votesNo = mutableSetOf<Player>()
    private var voteInProgress = false

    fun startVote(initiator: Player) {
        if (voteInProgress) {
            initiator.sendMessage(ChatUtil.format(configUtil.config.getString("vote.messages.vote-in-progress") ?: ""))
            return
        }

        votesYes.clear()
        votesNo.clear()
        voteInProgress = true

        val message = TextComponent(ChatUtil.format(configUtil.config.getString("vote.messages.start") ?: ""))
        val yesButton = TextComponent(ChatUtil.format(configUtil.config.getString("vote.messages.yes-button") ?: ""))
        yesButton.clickEvent = ClickEvent(ClickEvent.Action.RUN_COMMAND, "/vote yes")
        val noButton = TextComponent(ChatUtil.format(configUtil.config.getString("vote.messages.no-button") ?: ""))
        noButton.clickEvent = ClickEvent(ClickEvent.Action.RUN_COMMAND, "/vote no")

        message.addExtra("\n")
        message.addExtra(yesButton)
        message.addExtra("  ")
        message.addExtra(noButton)

        for (player in Bukkit.getOnlinePlayers()) {
            player.spigot().sendMessage(message)
            player.sendTitle(
                ChatUtil.format(configUtil.config.getString("vote.messages.title") ?: ""),
                ChatUtil.format(configUtil.config.getString("vote.messages.subtitle") ?: ""),
                10, 70, 20
            )
            player.playSound(player.location, Sound.BLOCK_NOTE_BLOCK_PLING, 1f, 1f)
        }

        object : BukkitRunnable() {
            var timeLeft = voteDuration
            override fun run() {
                if (timeLeft <= 0) {
                    endVote()
                    cancel()
                    return
                }
                for (player in Bukkit.getOnlinePlayers()) {
                    val actionBarMessage = ChatUtil.format(configUtil.config.getString("vote.messages.action-bar") ?: "")
                        .replace("{yes}", votesYes.size.toString())
                        .replace("{no}", votesNo.size.toString())
                        .replace("{time}", timeLeft.toString())
                    player.sendActionBar(actionBarMessage)
                }
                timeLeft--
            }
        }.runTaskTimer(plugin, 0L, 20L)
    }

    private fun endVote() {
        voteInProgress = false
        val totalPlayers = Bukkit.getOnlinePlayers().size
        val requiredVotes = maxOf(1, (totalPlayers * requiredPercentage / 100.0).toInt())

        if (votesYes.size >= requiredVotes) {
            Bukkit.getWorlds().forEach { world ->
                val targetTime = if (world.time < 12000) 13000 else 1000

                object : BukkitRunnable() {
                    var timeLeft = 20
                    val currentTime = world.time
                    override fun run() {
                        if (timeLeft <= 0) {
                            world.time = targetTime.toLong()
                            cancel()
                            return
                        }
                        val progress = 1 - (timeLeft / 20f)
                        world.time = (currentTime + ((targetTime - currentTime) * progress)).toLong()
                        timeLeft--
                    }
                }.runTaskTimer(plugin, 0L, 1L)
            }
            ChatUtil.broadcast(configUtil.config.getString("vote.messages.vote-success") ?: "")
        } else {
            ChatUtil.broadcast(configUtil.config.getString("vote.messages.vote-failed") ?: "")
        }
        votesYes.clear()
        votesNo.clear()
    }

    fun voteYes(player: Player) {
        if (voteInProgress) {
            votesYes.add(player)
            player.sendMessage(ChatUtil.format(configUtil.config.getString("vote.messages.vote-yes") ?: ""))
        } else {
            player.sendMessage(ChatUtil.format(configUtil.config.getString("vote.messages.vote-not-active") ?: ""))
        }
    }

    fun voteNo(player: Player) {
        if (voteInProgress) {
            votesNo.add(player)
            player.sendMessage(ChatUtil.format(configUtil.config.getString("vote.messages.vote-no") ?: ""))
        } else {
            player.sendMessage(ChatUtil.format(configUtil.config.getString("vote.messages.vote-not-active") ?: ""))
        }
    }

    fun isVoteInProgress(): Boolean {
        return voteInProgress
    }
}
