"use strict";
const getData = () => {
    return fetch("/sensors").then(x => x.json()).then((x) => {
        return x.sensorsResult.split("\n").map(x => x);
    });
};
window.getMachineData = getData;
