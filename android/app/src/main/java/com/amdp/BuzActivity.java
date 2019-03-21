package com.amdp;

import android.content.Context;
import android.content.Intent;

import com.facebook.react.AsyncReactActivity;

public class BuzActivity extends AsyncReactActivity {
    private final static String BUZ_NAME = "buzName";
    private final static String JS_PATH = "jsPath";

    public static void startBuzActivity(Context context, String buzName, String jsPath) {
        Intent intent = new Intent(context, BuzActivity.class);
        intent.putExtra(BUZ_NAME, buzName);
        intent.putExtra(JS_PATH, jsPath);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

//    @Override
//    protected void onCreate(@Nullable Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.buz_layout);
//    }

    @Override
    protected String getMainComponentName() {
        return "buz";
    }

    @Override
    protected String getScriptPath() {
        return "buz.android.bundle";
    }

    @Override
    protected ScriptType getScriptPathType() {
        return ScriptType.ASSET;
    }
}
