export type Sensor = {
    sensorName: string;
    command: string;
}
type SensorsResponse = {[command: string]: string}

const getData = (sensors: Sensor[]) => {
    return fetch("/sensors", {
        body: JSON.stringify({sensors}),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(x => x.json()) as Promise<SensorsResponse>;
}

window.getMachineData = getData;