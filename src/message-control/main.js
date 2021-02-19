const { basicRequestFormat } =require("./util") 
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');


const database = new sqlite3.Database('./public/db.sqlite3',(err) => {
    console.log("database creation");
    if (err) console.error('Database opening error: ',err);
});

ipcMain.on('asynchronous-message',(event,arg) => {
    console.log(arg); // prints "ping"
    const sql = basicRequestFormat(arg);
    const { params = [] } = arg
    console.log("request", sql);
    database.all(sql,params,(err,rows) => {
        event.reply('asynchronous-reply',(err && err.message) || rows);
    });
    // if (arg === 'ping') event.reply('asynchronous-reply', 'pong!');
    // else event.reply('asynchronous-reply', 'please, send me ping.');
}); 