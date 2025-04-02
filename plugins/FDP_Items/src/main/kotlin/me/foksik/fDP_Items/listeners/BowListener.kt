package me.foksik.fDP_Items.listeners

import me.foksik.fDP_Items.FDP_Items
import me.foksik.fDP_Items.items.SuperBow
import org.bukkit.*
import org.bukkit.entity.Arrow
import org.bukkit.entity.Player
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.entity.EntityShootBowEvent
import org.bukkit.event.player.PlayerItemHeldEvent
import org.bukkit.event.player.PlayerQuitEvent
import org.bukkit.potion.PotionEffect
import org.bukkit.potion.PotionEffectType
import org.bukkit.scheduler.BukkitRunnable

class BowListener : Listener {
    companion object {
        val bowHolders = mutableSetOf<Player>()
        private val activeTasks = mutableMapOf<Player, Int>()
    }

    @EventHandler
    fun onBowShoot(event: EntityShootBowEvent) {
        val bow = event.bow ?: return
        if (!SuperBow.isSuperBow(bow)) return

        val arrow = event.projectile as? Arrow ?: return

        arrow.velocity = arrow.velocity.multiply(5.0)
        arrow.damage = arrow.damage * 3.0
        arrow.isGlowing = true
        arrow.color = Color.PURPLE

        object : BukkitRunnable() {
            override fun run() {
                if (arrow.isDead || arrow.isOnGround) {
                    cancel()
                    return
                }

                arrow.world.spawnParticle(
                    Particle.DUST_COLOR_TRANSITION,
                    arrow.location,
                    3,
                    0.05, 0.05, 0.05,
                    0.0,
                    Particle.DustTransition(
                        Color.fromRGB(255, 105, 180),
                        Color.fromRGB(148, 0, 211),
                        1.0f
                    )
                )
            }
        }.runTaskTimer(FDP_Items.instance, 0L, 1L)
    }

    @EventHandler
    fun onItemHeld(event: PlayerItemHeldEvent) {
        val player = event.player
        val newItem = player.inventory.getItem(event.newSlot)

        activeTasks[player]?.let {
            FDP_Items.instance.server.scheduler.cancelTask(it)
            activeTasks.remove(player)
        }

        if (SuperBow.isSuperBow(newItem)) {
            val taskId = object : BukkitRunnable() {
                override fun run() {
                    if (!player.isOnline || !SuperBow.isSuperBow(player.inventory.itemInMainHand)) {
                        cancel()
                        bowHolders.remove(player)
                        activeTasks.remove(player)
                        player.removePotionEffect(PotionEffectType.GLOWING)
                        return
                    }

                    player.addPotionEffect(
                        PotionEffect(
                            PotionEffectType.GLOWING,
                            100,
                            0,
                            true,
                            false
                        )
                    )

                    val loc = player.location.add(0.0, 1.5, 0.0)
                    player.world.spawnParticle(
                        Particle.GLOW,
                        loc,
                        8,
                        0.3, 0.3, 0.3,
                        0.02
                    )
                }
            }.runTaskTimer(FDP_Items.instance, 0L, 10L).taskId

            activeTasks[player] = taskId
            bowHolders.add(player)
        } else {
            bowHolders.remove(player)
            player.removePotionEffect(PotionEffectType.GLOWING)
        }
    }

    @EventHandler
    fun onPlayerQuit(event: PlayerQuitEvent) {
        activeTasks[event.player]?.let {
            FDP_Items.instance.server.scheduler.cancelTask(it)
        }
        bowHolders.remove(event.player)
        event.player.removePotionEffect(PotionEffectType.GLOWING)
    }
}