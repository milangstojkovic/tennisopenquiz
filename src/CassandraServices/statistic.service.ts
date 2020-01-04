import {Statistic} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:9160/api';

export const getStatisticsService = (): Promise<Statistic[]> => 
    axios.get<Statistic[]>(
        `${baseUrl}/statistic`
    )
    .then(response => response.data)
    .catch(err => {
        throw err
    })

export const getStatisticByIdService = (id: String): Promise<Statistic>=>
    axios.get<Statistic>(
        `${baseUrl}/statistic/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createStatisticService = (statistic: Statistic): any => 
    axios.post<any>(
        `${baseUrl}/statistic`, statistic
    )
    .catch (err=>{
        throw err
    })
