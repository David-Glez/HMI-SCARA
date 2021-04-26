const initialState = {
    arduinos: [],
    components: [],
    sensors: [],
    steppers: [],
    servos: [],
    c_alterna: [],
    diaphragms: [],
    peristaltics: []
}

const SCARAReducer = (initialState, action) => {
    switch(action.type){
        case 'DATA_LOADED':
            return {
                ...initialState,
                arduinos: action.arduinos,
                components: action.components,
                sensors: action.sensors,
                steppers: action.steppers,
                servos: action.servos,
                c_alterna: action.c_alterna,
                diaphragms: action.diaphragms,
                peristaltics: action.peristaltics
            }
        case 'PORT_RECONNECTED':
            return {
                ...initialState,
                arduino_ports: action.ports
            }
    }
}

export{
    initialState,
    SCARAReducer
}