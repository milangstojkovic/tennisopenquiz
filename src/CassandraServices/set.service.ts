import {Set} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:9160/api';

export const getSetsByIdService = (id: String): Promise<[Set]>=>
    axios.get<[Set]>(
        `${baseUrl}/set/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createSetService = (set: Set): any => 
    axios.post<any>(
        `${baseUrl}/set`, set
    )
    .catch (err=>{
        throw err
    })