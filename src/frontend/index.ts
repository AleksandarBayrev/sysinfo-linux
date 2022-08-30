type SensorsResponse = {
    hostInfo: string;
    sensorsResult: string;
}

const getData = () => {
    return fetch("/sensors").then(x => x.json()).then((x: SensorsResponse) => {
        return {
            hostInfo: x.hostInfo.replace("\n", ""),
            sensorsResult: x.sensorsResult.split("\n").map(x => x)
        };
    });
}

window.getMachineData = getData;