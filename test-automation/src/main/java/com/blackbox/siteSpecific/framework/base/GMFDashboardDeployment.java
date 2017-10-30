package com.blackbox.siteSpecific.framework.base;

import com.blackbox.dataModels.ServiceModel;
import com.blackbox.dataModels.ServiceState;
import com.blackbox.dataModels.ServiceType;

import java.util.Map;


public class GMFDashboardDeployment {
    public String siteUrl;
    public String deploymentFlag, browserFlag;
    public BrowserType browserType;

    public ServiceModel jvmTestService;
    public ServiceModel goTestService;
    public int testServiceInstanceIndex;

    public GMFDashboardDeployment() {
        // Load the system deployment variables
        Map<String, String> systemEnvironment = System.getenv();
        deploymentFlag = System.getProperty("blackbox.environment", "local");
        browserFlag = System.getProperty("blackbox.browser", "chrome");

        if(deploymentFlag.toUpperCase().equals("LOCAL")) {
            siteUrl = "http://localhost:3000";

            jvmTestService = new ServiceModel.ServiceModelBuilder()
                    .setName("Mail Entry")
                    .setVersion("2.4")
                    .setState(ServiceState.STABLE)
                    .setType(ServiceType.JVM)
                    .build();
            goTestService = new ServiceModel.ServiceModelBuilder()
                    .setName("Virtual Team Channel")
                    .setVersion("4.5")
                    .setState(ServiceState.STABLE)
                    .setType(ServiceType.GO)
                    .build();
            testServiceInstanceIndex = 1;
        }

        // Set the browser type
        if(browserFlag.toUpperCase().equals("FIREFOX")) {
            browserType = BrowserType.MOZILLA_FIREFOX;
        } else if(browserFlag.toUpperCase().equals("CHROME")) {
            browserType = BrowserType.GOOGLE_CHROME;
        }
    }
}