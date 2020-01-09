import {Player} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'https://localhost:9160/api';

export const getPlayersService = (): Promise<Player[]> => 
    axios.get<Player[]>(
        `${baseUrl}/player`
    )
    .then(response => response.data)
    .catch(err => {
        throw err
    })

export const getPlayerByIdService = (id: String): Promise<Player>=>
    axios.get<Player>(
        `${baseUrl}/player/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createPlayerService = (player: Player): any => 
    axios.post<any>(
        `${baseUrl}/player`, player
    )
    .catch (err=>{
        throw err
    })