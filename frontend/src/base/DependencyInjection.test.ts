import { DependencyInjection } from "./DependencyInjection";
import { enhanceClass } from "./helpers";
import { AvailableServices } from "./types";

describe("DependencyInjection", () => {
    beforeEach(() => {
        DependencyInjection.setupInstance(jest.fn((message) => {}), true);
    });
    afterEach(() => {
        DependencyInjection["instance"] = null;
    })
    it("getInstance returns instance", () => {
        const instanceOne = DependencyInjection.getInstance();
        const instanceTwo = DependencyInjection.getInstance();
        expect(instanceOne).toEqual(instanceTwo);
    });
    it("getInstance throws if setup is not performed", () => {
        DependencyInjection["instance"] = null;
        try {
            DependencyInjection.getInstance();
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
    it("setupInstance throws if setup is already performed", () => {
        DependencyInjection["instance"] = null;
        try {
            DependencyInjection.setupInstance((message) => {}, false);
            DependencyInjection.setupInstance((message) => {}, false);
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
    it("registerService registers an instance", () => {
        interface IMyLogger {};
        class MyLogger implements IMyLogger {};
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyLogger>("IMyLogger" as AvailableServices, "singleton", MyLogger, []);
        expect(DependencyInjection.getInstance().hasService("IMyLogger" as AvailableServices));
    });
    it("registerService does not register an instance if the class is missing a className property", () => {
        interface IMyLogger {};
        class MyLogger implements IMyLogger {};
        try {
            DependencyInjection.getInstance().registerService<IMyLogger>("IMyLogger" as AvailableServices, "singleton", MyLogger, []);
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
    it("registerService does not register an instance if it is already present", () => {
        interface IMyLogger {};
        class MyLogger implements IMyLogger {};
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyLogger>("IMyLogger" as AvailableServices, "singleton", MyLogger, []);
        try {
            DependencyInjection.getInstance().registerService<IMyLogger>("IMyLogger" as AvailableServices, "singleton", MyLogger, []);
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
        expect(DependencyInjection.getInstance().hasService("IMyLogger" as AvailableServices));
    });
    it("registerService with singleton returns the same instance", () => {
        interface IMyNewLogger {};
        class MyLogger implements IMyNewLogger {};
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyNewLogger>("IMyNewLogger" as AvailableServices, "singleton", MyLogger, []);
        const instanceOne = DependencyInjection.getInstance().getService<IMyNewLogger>("IMyNewLogger" as AvailableServices);
        const instanceTwo = DependencyInjection.getInstance().getService<IMyNewLogger>("IMyNewLogger" as AvailableServices);
        expect(instanceOne).toBe(instanceTwo);
    });
    it("registerService with transient does not return the same instance", () => {
        interface IMyNewNewLogger {
            name: string;
        };
        class MyLogger implements IMyNewNewLogger {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
        };
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices, "transient", MyLogger, ["asd"]);
        const instanceOne = DependencyInjection.getInstance().getService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices);
        const instanceTwo = DependencyInjection.getInstance().getService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices);
        expect(instanceOne).not.toBe(instanceTwo);
    });
    it("getService throws if a service is missing", () => {
        interface IMyNewNewLogger {
            name: string;
        };
        class MyLogger implements IMyNewNewLogger {
            name: string;
            constructor(name: string) {
                this.name = name;
            }
        };
        enhanceClass(MyLogger, "MyLogger");
        try {
            DependencyInjection.getInstance().getService<IMyNewNewLogger>("IMyNewNewLogger" as AvailableServices);
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
    it("registerService with invalid lifespan throws", () => {
        interface IMyNewLogger {};
        class MyLogger implements IMyNewLogger {};
        enhanceClass(MyLogger, "MyLogger");
        try {
            DependencyInjection.getInstance().registerService<IMyNewLogger>("IMyNewLogger" as AvailableServices, "wronglifespan" as any, MyLogger, []);
            DependencyInjection.getInstance().getService<IMyNewLogger>("IMyNewLogger" as AvailableServices);
        } catch (err) {
            expect(err).not.toBeUndefined();
        }
    });
    it("registerService with invalid lifespan throws (logOnGet = false)", () => {
        const logger = jest.fn((message) => {});
        DependencyInjection["instance"] = null;
        DependencyInjection.setupInstance(logger, false);
        interface IMyNewLogger {};
        class MyLogger implements IMyNewLogger {};
        enhanceClass(MyLogger, "MyLogger");
        DependencyInjection.getInstance().registerService<IMyNewLogger>("IMyNewLogger" as AvailableServices, "wronglifespan" as any, MyLogger, []);
        DependencyInjection.getInstance().getService<IMyNewLogger>("IMyNewLogger" as AvailableServices);
        expect(logger).toHaveBeenCalledTimes(2);
    });
});