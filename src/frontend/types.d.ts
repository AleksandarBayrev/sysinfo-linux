declare interface Window {
    getMachineData: (sensors: import("./index").Sensor[]) => Promise<any>
}