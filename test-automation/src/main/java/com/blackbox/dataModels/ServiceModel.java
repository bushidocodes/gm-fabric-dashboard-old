package com.blackbox.dataModels;

public class ServiceModel {
    private String name;
    private String version;
    private ServiceState state;
    private ServiceType type;

    // <editor-fold desc="Constructors">

    public ServiceModel() {}

    public ServiceModel(ServiceModelBuilder builder) {
        setName(builder.nestedName);
        setVersion(builder.nestedVersion);
        setState(builder.nestedState);
        setType(builder.nestedType);
    }

    // </editor-fold>


    // <editor-fold desc="Getters and Setters">

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return this.version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public ServiceState getState() {
        return this.state;
    }

    public void setState(ServiceState state) {
        this.state = state;
    }

    public ServiceType getType() {
        return this.type;
    }

    public void setType(ServiceType type) {
        this.type = type;
    }

    // </editor-fold>


    // <editor-fold desc="Builder">

    public static class ServiceModelBuilder {
        String nestedName;
        String nestedVersion;
        ServiceState nestedState;
        ServiceType nestedType;

        public ServiceModelBuilder() {}

        public ServiceModelBuilder setName(String name) {
            this.nestedName = name;
            return this;
        }

        public ServiceModelBuilder setVersion(String version) {
            this.nestedVersion = version;
            return this;
        }

        public ServiceModelBuilder setState(ServiceState state) {
            this.nestedState = state;
            return this;
        }

        public ServiceModelBuilder setType(ServiceType nestedType) {
            this.nestedType = nestedType;
            return this;
        }

        public ServiceModel build() {
            return new ServiceModel(this);
        }
    }

    // </editor>
}