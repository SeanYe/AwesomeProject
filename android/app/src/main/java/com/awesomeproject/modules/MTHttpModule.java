package com.awesomeproject.modules;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by zj-db0572 on 10/8/16.
 */
public class MTHttpModule extends ReactContextBaseJavaModule {
    public MTHttpModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MTHttpAndroid";
    }

    @ReactMethod
    public void get(String url, Promise promise) {
        Request request = new Request.Builder().url(url).get().build();
        try {
            Response response = new OkHttpClient().newCall(request).execute();
            WritableMap map = Arguments.createMap();
            map.putString("url", url);
            map.putString("body", response.body().string());
            promise.resolve(map);
        } catch (IOException e) {
            promise.reject(url, e.getMessage());
        }
    }
}
