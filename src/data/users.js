const users = [
    {
      email: "atapas@email.com",
      password: "password"
    },
    {
      email: "alex@email.com",
      password: "password"
    },
    {
      email: "bob@email.com",
      password: "password"
    },
    {
      email: "moemad191@gmail.com",
      password: "123123"
    }
  ]
  
  export const getUserByEmail = (email) => {
    const found = users.find(user => user.email === email);
    return found;
  }