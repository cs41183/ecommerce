const app = require("./app");
const { connectDatabases } = require('./db/Database')

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

//Konekto databazat
connectDatabases();




// Krijimi i serverit
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Serveri eshte duke funksionuar ne http://localhost:${process.env.PORT}`.cyan.bold
    );
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`.purple);
    console.log(`Shutting down the server for unhandled promise rejection`.purple);

    server.close(() => {
        process.exit(1);
    });
});