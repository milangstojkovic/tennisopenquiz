import {BreakPt} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'https://localhost:9160/api';

export const getBreakPtByIdService = (id: String): Promise<BreakPt>=>
    axios.get<BreakPt>(
        `${baseUrl}/breakpt/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createBreakPtService = (breakPt: BreakPt): any => 
    axios.post<any>(
        `${baseUrl}/breakpt`, breakPt
    )
    .catch (err=>{
        throw err
    })