import {Match} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'https://localhost:5001/api';

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

export const updateMatchService = (match:Match):any =>
    axios.put(
        `${baseUrl}/match/${match.matchid}`, match
    )
