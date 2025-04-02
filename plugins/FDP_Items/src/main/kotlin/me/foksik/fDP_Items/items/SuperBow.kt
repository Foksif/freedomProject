package me.foksik.fDP_Items.items


import org.bukkit.*
import org.bukkit.enchantments.Enchantment
import org.bukkit.inventory.ItemStack
import org.bukkit.inventory.meta.ItemMeta
import net.kyori.adventure.text.Component
import net.kyori.adventure.text.format.TextColor

object SuperBow {
    fun create(): ItemStack {
        val bow = ItemStack(Material.BOW)
        val meta: ItemMeta = bow.itemMeta ?: return bow

        meta.displayName(Component.text("§d§lСупер Лук").color(TextColor.color(0xFF55FF)))
        meta.lore(listOf(
            Component.text("§7Стреляет стрелами с невероятной скоростью"),
            Component.text("§7и создаёт красивые эффекты!"),
            Component.text(""),
            Component.text("§eПКМ§7 чтобы выстрелить")
        ))

        meta.addEnchant(Enchantment.INFINITY, 1, true)
        meta.addItemFlags(org.bukkit.inventory.ItemFlag.HIDE_ENCHANTS)

        meta.setCustomModelData(1001)

        bow.itemMeta = meta
        return bow
    }

    fun isSuperBow(item: ItemStack?): Boolean {
        if (item?.type != Material.BOW) return false
        return item.itemMeta?.hasCustomModelData() == true &&
                item.itemMeta?.customModelData == 1001
    }
}