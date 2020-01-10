import {User} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'http://localhost:9160/api';

export const getUsersService = (): Promise<User[]> => 
    axios.get<User[]>(
        `${baseUrl}/user`
    )
    .then(response => response.data)
    .catch(err => {
        throw err
    })

export const getUserByIdService = (id: String): Promise<User>=>
    axios.get<User>(
        `${baseUrl}/user/${id}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createUserService = (user: User): any => 
    axios.post<any>(
        `${baseUrl}/user`, user,{
            headers: {
                'Content-Type': 'application/json',
            }
        }

    )
    .catch (err=>{
        throw err
    })
