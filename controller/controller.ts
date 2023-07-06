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

    // // updating a todo
    // async updateTodo(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the todo.
    //         let todo = data.find((todo) => todo.id === parseInt(id));
    //         // if no todo, return an error
    //         if (!todo) {
    //             reject(`No todo with id ${id} found`);
    //         }
    //         //else, update it by setting completed to true
    //         todo["completed"] = true;
    //         // return the updated todo
    //         resolve(todo);
    //     });
    // }

    // // deleting a todo
    // async deleteTodo(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the todo
    //         let todo = data.find((todo) => todo.id === parseInt(id));
    //         // if no todo, return an error
    //         if (!todo) {
    //             reject(`No todo with id ${id} found`);
    //         }
    //         // else, return a success message
    //         resolve(`Todo deleted successfully`);
    //     });
    // }
}