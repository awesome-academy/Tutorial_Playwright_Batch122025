let username: string = "Le Thi Ha";
let age: number = 30;
const isActive: boolean = true;
const roles: string[] = ["Admin", "Editor"];

const user: {
  name: string;
  email: string;
  isAdmin: boolean;
} = {
  name: username,
  email: "le.thi.ha@sun-asterisk.com",
  isAdmin: true,
};

console.log(
  `User: ${user.name} (email: ${user.email}), Roles: ${roles.join(
    ", "
  )}, Active: ${isActive}`
);

function checkAge(age: number): string {
  if (age >= 18) {
    return "Adult";
  } else {
    return "Under 18";
  }
}

console.log(`Age status: ${checkAge(age)}`);