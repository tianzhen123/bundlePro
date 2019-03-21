package com.buz;

import android.util.Log;

import com.amdp.BuzActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 加载业务模块
 */
public class BuzModule extends ReactContextBaseJavaModule {
    private final String TAG = BuzModule.class.getName();

    public BuzModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BuzModule";
    }

    /**
     * 加载业务应用
     * @param modelName
     * @param jsPath
     */
    @ReactMethod
    public void loadBuzModel(String modelName, String jsPath) {
        Log.e(TAG,"loadBuzModel |"+ modelName + "|" + jsPath);
        BuzActivity.startBuzActivity(getReactApplicationContext(), modelName, jsPath);
    }
}
