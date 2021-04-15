const {app} = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = !app.isPackaged 
    ? path.join(app.getAppPath(), 'database/actuadores.db') 
    : path.join(process.resourcesPath, `database/actuadores.db`);

const db = new sqlite3.Database(dbPath, (error) => {
    if(error){
        console.log(`Database error: ${error}`);
    }
    console.log('Database connected successfully!')
})

const runQueryAll = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (error, rows) => {
            if(error){
                console.log(error)
                reject(error)
            }else{
                resolve(rows)
            }
        })
    })
}

const getActuatorsList = async() => {
    let sql_query = {
        arduinos: 'select * from arduinos',
        motores: `select * from motores 
                    inner join components on components.id = motores.component`,
        bombas: `select * from bombas
                    inner join components on components.id = bombas.component`,
        sensores: `select * from sensores
                    inner join components on components.id = sensores.component`,
        componentes: 'select * from components' 
    }

    let [motores, arduinos, bombas, sensores, componentes] = await Promise.all(
        [ 
            runQueryAll(sql_query.motores),  
            runQueryAll(sql_query.arduinos),
            runQueryAll(sql_query.bombas),
            runQueryAll(sql_query.sensores),
            runQueryAll(sql_query.componentes)
        ])
    let data = {
        arduinos: arduinos,
        motores: motores,
        bombas: bombas,
        sensores: sensores,
        componentes: componentes
    }
    
    return data
}

module.exports = {
    getActuatorsList
}