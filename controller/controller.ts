import { users } from "../data/users";
import { getUUID, validateFields } from "../utils/utils";

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

interface iUserCreate {
  username: string,
  age: number,
  hobbies: string[],
}

interface iUser {
    id: string,
    username: string,
    age: number,
    hobbies: string[],
  }

let user1: iUser = users[1];

export class Controller {
    async getUsers() {

        return new Promise((resolve, _) => resolve(users));
    }

    async getUser(id: string) {
        return new Promise((resolve, reject) => {
            let user = users.find((user) => user.id === id);
            if (user) {
                resolve(user);
            } else {
                reject("User with this id doesn't exist");
            }
        });
    }

    async createUser(user: iUserCreate) : Promise<string | iUser>{
        return new Promise((resolve, reject) => {
            if (validateFields(user, user1)) {
                let newTodo = {
                    id: getUUID(),
                    ...user,
                } 
    
                resolve(newTodo);
                
            } else reject("Wrong data");
        });
    }

    async updateUser(id:string, user: iUserCreate) : Promise<string | iUser> {
        return new Promise((resolve, reject) => {
            let userIndex = users.findIndex((user) => user.id === id);
            if (userIndex == -1) {
                reject(`No user with id ${id} found`);
            }
            let updatedUser = {
                id: id,
                ...user,
            }
            console.log(users)
            users[userIndex] = updatedUser;
            resolve(updatedUser);
        });
    }

    async deleteUser(id: string) {
        return new Promise((resolve, reject) => {
            let deletedUser = users.find((user) =>user.id === id);
            if (!deletedUser) {
                reject(`No user with id ${id} found`);
            }
            resolve(`User deleted successfully`);
        });
    }
}