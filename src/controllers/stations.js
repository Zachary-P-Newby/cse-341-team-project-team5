import { getAllStations as findAllStations, getStationById as findStationById } from "../models/stations.js";

export async function getAllStations(req, res){
    try{
        const stations = await findAllStations();
        
        return res.status(200).json(stations);
    }catch(error){
        console.error("Failed fetching stations.", error);
        return res.status(500).json({error: "Internal Service Error"})
    }
}


export async function getStationById(req, res){

    try{
        const { id } = req.params;
                
        const station = await findStationById(id);

        if(!station){
            return res.status(404).json({error: "Station Not Found"});
        }

        return res.status(200).json(station);
    }catch(error){
        console.error("Failed fetching station.", error);
        return res.status(500).json({error: "Internal Service Error"})
    }
}