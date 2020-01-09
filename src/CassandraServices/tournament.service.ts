import {Tournament} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'https://localhost:9160/api';

export const getTournamentsService = (): Promise<Tournament[]> => 
    axios.get<Tournament[]>(
        `${baseUrl}/tournament`
    )
    .then(response => response.data)
    .catch(err => {
        throw err
    })

export const getTournamentByIdService = (id: String): Promise<Tournament>=>
    axios.get<Tournament>(
        `${baseUrl}/tournament/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createTournamentService = (tournament: Tournament): any => 
    axios.post<any>(
        `${baseUrl}/tournament`, tournament
    )
    .catch (err=>{
        throw err
    })
