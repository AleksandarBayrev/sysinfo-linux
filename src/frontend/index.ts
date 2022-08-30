type SensorsResponse = {
    sensorsResult: string;
}

const getData = () => {
    return fetch("/sensors").then(x => x.json()).then((x: SensorsResponse) => {
        return x.sensorsResult.split("\n").map(x => x);
    });
}

window.getMachineData = getData;