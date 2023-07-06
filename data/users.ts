interface iUser {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}

export const users: iUser[] = [
  {
    "id": "08f02912-19ef-11ee-be56-0242ac120002",
    "username": "Lena",
    "age": 33,
    "hobbies": ["zumba"]
  },
  {
    "id": "08f02912-19ef-11ee-be56-0242ac120002",
    "username": "Andrei",
    "age": 35,
    "hobbies": ["dota", "sleeping"]
  },
  {
    "id": "08f02912-19ef-11ee-be56-0242ac120002",
    "username": "Eva",
    "age": 6,
    "hobbies": ["music", "gymnastic"]
  },
]