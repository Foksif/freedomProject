package me.foksik.fDP_Items

import me.foksik.fDP_Items.commands.GiveCommand
import me.foksik.fDP_Items.listeners.BowListener
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.player.PlayerQuitEvent
import org.bukkit.potion.PotionEffectType
import org.bukkit.plugin.java.JavaPlugin

class FDP_Items : JavaPlugin() {
    companion object {
        lateinit var instance: FDP_Items
            private set
    }

    override fun onEnable() {
        instance = this

        // Register commands
        getCommand("fdpitems")?.setExecutor(GiveCommand())

        // Register quit event listener
        server.pluginManager.registerEvents(object : Listener {
            @EventHandler
            fun onPlayerQuit(event: PlayerQuitEvent) {
                BowListener.bowHolders.remove(event.player)
                event.player.removePotionEffect(PotionEffectType.GLOWING)
            }
        }, this)

        // Register bow listener
        server.pluginManager.registerEvents(BowListener(), this)

        logger.info("FDPItems has been enabled!")
    }

    override fun onDisable() {
        logger.info("FDPItems has been disabled!")
    }
}
