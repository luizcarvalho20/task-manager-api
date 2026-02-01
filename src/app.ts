import express from "express";

const app = express();

// Middlewares essenciais 
app.use(express.json());

//Healthcheck 
app.get("/health",(_req, res)=>{  
    return res.status(200).json({ status: "ok"});
});

export {app};

  
