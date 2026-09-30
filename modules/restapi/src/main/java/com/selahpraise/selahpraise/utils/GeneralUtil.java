package com.selahpraise.selahpraise.utils;

import java.util.Collection;
import java.util.Hashtable;
import java.util.Map;
import java.util.Optional;

public class GeneralUtil {
    public static boolean isCollectionNullOrEmpty(final Collection<?> c) {
        return c == null || c.isEmpty();
    }

    public static Map<String, Object> makeMapResponse(String title, Object array) {

        Map<String, Object> response = new Hashtable<>();
        response.put("success", Constants.OK);
        response.put(title, array);

        return response;
    }

    public static boolean isNullOrEmpty(Object object) {
        return (null == object || (object instanceof String && object.toString().isEmpty()));
    }

    public static String IsStrNullEmpty(String str) {
        if (str == null || str.length() == 0)
            return "";

        return str;
    }

    public static boolean validStringOptinal(Optional<String> sValue) {
        try {
            if (sValue.isPresent()) {
                return true;
            } else
                return false;
        } catch (Exception e) {
            return false;
        }
    }

    public static String getStrOpt(Optional<String> sValue) {
        try {
            if (sValue.isPresent()) {
                return sValue.get();
            } else
                return null;
        } catch (Exception e) {
            return null;
        }
    }

    public static Integer getIntOpt(Optional<Integer> sValue) {
        try {
            if (sValue.isPresent()) {
                return sValue.get();
            } else
                return 0;
        } catch (Exception e) {
            return 0;
        }
    }
}
