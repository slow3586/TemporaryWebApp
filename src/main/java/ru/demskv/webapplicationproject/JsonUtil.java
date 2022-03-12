package ru.demskv.webapplicationproject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Utility class that parses POJOs to JSON.
 */
public class JsonUtil {
    /**
    * Jackson ObjectMapper singleton.
    */
    private static ObjectMapper json;
    private static ObjectMapper getInstance(){
        if(json == null){
            json = new ObjectMapper();
            json.registerModule(new JavaTimeModule());
            json.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        }
        return json;
    }
    
    /**
     * Parse java object to JSON.
     * @param o java object
     * @return String JSON string.
     */
    public static String tojson(Object o){
        try {
            return getInstance().writeValueAsString(o);
        } catch (JsonProcessingException ex) {
            Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "";
    }
}
