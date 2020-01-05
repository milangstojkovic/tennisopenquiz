import {Match} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:9160/api';

export const getMatchesService = (): Promise<Match[]> => 
    axios.get<Match[]>(
        `${baseUrl}/match`
    )
    .then(response => response.data)
    .catch(err => {
        throw err
    })

export const getMatchByIdService = (id: String): Promise<Match>=>
    axios.get<Match>(
        `${baseUrl}/match/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createMatchService = (match: Match): any => 
    axios.post<any>(
        `${baseUrl}/match`, match
    )
    .catch (err=>{
        throw err
    })