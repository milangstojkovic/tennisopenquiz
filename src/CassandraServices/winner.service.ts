import {Winner} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'https://localhost:5001/api';

export const getWinnersByIdService = (id: String): Promise<Winner>=>
    axios.get<Winner>(
        `${baseUrl}/winner/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createWinnerService = (winner: any): any => 
    axios.post<any>(
        `${baseUrl}/winner`, winner
    )
    .catch (err=>{
        throw err
    })