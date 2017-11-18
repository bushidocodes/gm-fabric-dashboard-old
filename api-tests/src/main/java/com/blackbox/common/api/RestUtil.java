package com.blackbox.common.api;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.sun.jersey.api.client.ClientResponse;
import javax.net.ssl.*;
import java.io.IOException;
import java.net.URL;
import java.security.cert.CertificateException;
import java.security.*;

public class RestUtil {
    private static String responseType = "application/json";
    JsonParser jsonParser;
    ClientResponse clientResponse;
    private String keyStorePath;
    private String keystorePassword;
    private String trustStorePath;
    private String trustStorePassword;
    KeyStore keyStore;
    KeyStore trustStore;
    KeyManager[] keyManagers;
    TrustManager[] trustManagers;


    // <editor-fold desc="Constructor">

    public RestUtil() {
        keyStorePath = "/opt/keystore.jks";
        keystorePassword = "password";
        trustStorePath = "/opt/truststore-josh.jks";
        trustStorePassword = "password";

        try {
            keyStore = Https.loadKeyStore(keyStorePath, keystorePassword);
            trustStore = Https.loadKeyStore(trustStorePath, trustStorePassword);
            keyManagers = Https.loadKeyManagers(keyStore, keystorePassword);
            trustManagers = Https.loadTrustManager(trustStore);
        } catch(CertificateException |
                IOException |
                KeyStoreException |
                NoSuchAlgorithmException |
                UnrecoverableKeyException
                e) {
            e.printStackTrace();
        }

        jsonParser = new JsonParser();
    }

    // </editor-fold>


    // <editor-fold desc="Private Helper Methods">

    private JsonElement getJsonFromRestResponse(ClientResponse response) {
        return jsonParser.parse(clientResponse.getEntity(String.class));
    }

    // </editor-fold>


    // <editor-fold desc="Methods to Make REST Calls">

    public JsonElement get(String restUrl) {
        URL convertedUrl;
        String response = null;

        try {
            convertedUrl = new URL(restUrl);
            response = Https.fetch(keyManagers, trustManagers, convertedUrl);
        } catch(NoSuchAlgorithmException |
                IOException |
                KeyManagementException
                e) {
            e.printStackTrace();
        }

        System.out.println(response);  // DEBUG

        // Parse the JSON from the REST response and return it as a JsonElement object
//        return getJsonFromRestResponse(clientResponse);

        return jsonParser.parse(response);  // DEBUG
    }

    // </editor-fold>
}
