import { users } from "../data/users";

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

interface FullError {
  "statusCode" : number,
  "errorMessage": string
}

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

    // // creating a todo
    // async createTodo(todo) {
    //     return new Promise((resolve, _) => {
    //         // create a todo, with random id and data sent
    //         let newTodo = {
    //             id: Math.floor(4 + Math.random() * 10),
    //             ...todo,
    //         };

    //         // return the new created todo
    //         resolve(newTodo);
    //     });
    // }

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