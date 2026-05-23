package com.uniway

import android.content.Intent
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.unity3d.player.UnityPlayer

class UnityModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "UnityModule"
    }

    @ReactMethod
    fun openUnity(startRoom: String, destinationRoom: String) {
        val activity = getCurrentActivity() ?: return

        val navigationData = "$startRoom|$destinationRoom"

        val intent = Intent()
        intent.setClassName(
            activity.packageName,
            "com.unity3d.player.UnityPlayerGameActivity"
        )

        activity.startActivity(intent)

        Handler(Looper.getMainLooper()).postDelayed({
            UnityPlayer.UnitySendMessage(
                "PathController",
                "NavigateFromTo",
                navigationData
            )
        }, 3000)
    }

    @ReactMethod
    fun sendNavigation(startRoom: String, destinationRoom: String) {
        val navigationData = "$startRoom|$destinationRoom"

        UnityPlayer.UnitySendMessage(
            "PathController",
            "NavigateFromTo",
            navigationData
        )
    }
}