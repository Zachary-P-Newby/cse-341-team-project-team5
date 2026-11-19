import { Router } from 'express';
import { getAllStations, getStationById } from '../controllers/stations.js';

const ApiRouter = Router();


// stations
/**
* @openapi
*   /api/stations:
*       get:
*           summary: Gets all of the train stations.
*           tags: 
*               - Stations
*           responses:
*               200:
*                   description: All Stations.
*               500:
*                   description: Internal Service Error.
*
*/
ApiRouter.get('/stations', getAllStations);

/**
* @swagger
*   /api/stations/{id}:
*       get:
*           summary: Gets a train by id
*           parameters:
*             - in: path
*               name: id
*               required: true
*               schema:
*                   type: string
*               description: The Station ID.
*           tags: 
*             - Stations
*           responses:
*               200:
*                   description: Station Found.
*               404:
*                   description: Station Not Found.
*               500:
*                   description: Internal Service Error.
*/
ApiRouter.get("/stations/:id", getStationById);



export default ApiRouter;