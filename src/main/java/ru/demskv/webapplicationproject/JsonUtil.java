package ru.demskv.webapplicationproject;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.text.DateFormatter;
import java.util.Date;

public class JsonUtil {
    private static ObjectMapper json;
    public static ObjectMapper getInstance(){
        if(json == null){
            json = new ObjectMapper();
            json.registerModule(new JavaTimeModule());
            json.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        }
        return json;
    }
    public static String tojson(Object o){
        try {
            return getInstance().writeValueAsString(o);
        } catch (JsonProcessingException ex) {
            Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "";
    }
}
