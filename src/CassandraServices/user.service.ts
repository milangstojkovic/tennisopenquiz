import {User} from "../Models/Model";
import axios from 'axios';
const baseUrl = 'https://localhost:5001/api';

export const getUsersService = (): Promise<User[]> => 
    axios.get<User[]>(
        `${baseUrl}/users`
    )
    .then(response => response.data)
    .catch(err => {
        throw err
    })

export const getUserByNameService = (name: String): Promise<User>=>
     axios.get<User>(
        `${baseUrl}/users/${name}`
    )
    .then(response=>response.data)
    .catch(err => {
        throw err
    })

export const createUserService = (user: User): any =>
    axios.post(
        `${baseUrl}/users`, user
    ).then((res)=>{console.log(res)})
    .catch (err=>{
        throw err
    })