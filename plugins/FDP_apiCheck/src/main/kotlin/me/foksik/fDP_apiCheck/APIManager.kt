package me.foksik.fDP_apiCheck

import org.bukkit.plugin.java.JavaPlugin
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicBoolean
import java.util.concurrent.atomic.AtomicReference

class APIManager(private val plugin: JavaPlugin) {
    private val apiUrl = "http://localhost:3000/news"
    private val lastCheckTime = AtomicReference<Long>(0L)
    private val lastStatus = AtomicBoolean(false)
    private val cacheTime = TimeUnit.SECONDS.toMillis(5) // Кешируем статус на 5 секунд

    fun isAPIAvailable(): Boolean {
        val currentTime = System.currentTimeMillis()

        // Используем кешированное значение, если не прошло cacheTime
        if (currentTime - lastCheckTime.get() < cacheTime) {
            return lastStatus.get()
        }

        return try {
            val url = URL(apiUrl)
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            connection.connectTimeout = 5000
            connection.readTimeout = 5000

            val responseCode = connection.responseCode
            connection.disconnect()

            val available = responseCode == 200
            lastStatus.set(available)
            lastCheckTime.set(currentTime)

            available
        } catch (e: Exception) {
            plugin.logger.warning("Ошибка при проверке API: ${e.message}")
            lastStatus.set(false)
            lastCheckTime.set(currentTime)
            false
        }
    }
}