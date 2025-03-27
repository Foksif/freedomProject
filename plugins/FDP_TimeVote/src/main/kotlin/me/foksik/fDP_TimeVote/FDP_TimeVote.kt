package me.foksik.fDP_TimeVote

import me.foksik.fDP_TimeVote.commands.VoteCommand
import me.foksik.fDP_TimeVote.commands.VoteTimeCommand
import org.bukkit.plugin.java.JavaPlugin

class FDP_TimeVote : JavaPlugin() {
    companion object {
        lateinit var instance: FDP_TimeVote
    }

    private lateinit var voteManager: VoteManager

    override fun onEnable() {
        instance = this
        saveDefaultConfig()

        voteManager = VoteManager(this)

        getCommand("votetime")?.setExecutor(VoteTimeCommand(voteManager, instance))
        getCommand("vote")?.setExecutor(VoteCommand(voteManager))

        logger.info("VoteTimePlugin включен!")
    }

    override fun onDisable() {
        logger.info("VoteTimePlugin выключен.")
    }
}
