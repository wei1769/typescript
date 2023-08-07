// without type annotation, it's added automatically for some types
let name1 = "wei";
// with type annotation
let name2: string = "wei";

// number, can be int or float
let year: number = 2023;
// boolean
let isOpened: boolean = false;

let time;

// Any
function getTime() {
  return 2023;
}
time = getTime();

// functions
function sum(x: number, y: number) {
  return x + y;
}
// or with type annotation
function sum2(x: number, y: number): number {
  return x + y;
}

// arrow functions
let sub = (x: number, y: number): number => x - y;

// default value
function getUser(id: number = 0) {
  return id.toString();
}

// optional args
function getUser2(id?: number) {
  if (id) return id.toString();
  else return "0";
}

// native methods
let scores = [1, 2, 3];

let scoresSum = scores.reduce((a, b) => a + b, 0);

let sumInStr = scores.map((x): string => x.toString());

// void function
function logError(err: string): void {
  console.log(err);
}

// never function
function throwError(err: string): never {
  throw new Error(err);
}

//// Objects

//define a new object
let userInfo = {
  name: "John",
  age: 30,
  address: "HN",
  phone: "123456789",
  email: "john@example.com",
};

// object in function arg
function parsedUserInfo(info: { name: string; age: number }): string {
  return `${info.name} + ${info.age}`;
}

// returning object in functions
function parsedUserInfo2({ name, age }: { name: string; age: number }): {
  name: string;
  age: string;
} {
  return { name, age: age.toString() };
}

// typing
type User = {
  name: string;
  age: number;
  address: string;
  phone: string;
  email: string;
};

// function with typed arg and return
function createUser(user: User): User {
  return user;
}

// classes
class UserAccount {
  email: string;
  public name: string;
  readonly phone: string;
  private password: string;
  private location: string;
  constructor(
    email: string,
    name: string,
    phone: string,
    password: string,
    location: string = "Earth"
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.password = password;
    this.location = location;
  }
}

// create new user account object
let user = new UserAccount("email", "wei", "0800", "password");

// edit user account
user.email = "ben@example.com";

// TypeScript class
class UserAccountInfo {
  constructor(
    public email: string,
    public name: string,
    readonly phone: string,
    private password: string,
    private location: string = "Earth"
  ) {}
}

// class with methods
class Login {
  private _isLoggedIn: boolean = false;
  constructor(
    public mail: string,
    private password: string,
    private role: string = "user"
  ) {}

  login() {
    this._isLoggedIn =
      this.password === "password" && this.mail === "wei@example.com";
  }
  get loginStatus(): boolean {
    return this._isLoggedIn;
  }
  set setStatus(role: string) {
    if (this._isLoggedIn) {
      this.role = role;
    } else {
      throwError("You must login first");
    }
  }
  private printPassword() {
    console.log(this.password);
  }
  debug() {
    if (this._isLoggedIn && this.role === "admin") {
      this.printPassword();
    }
  }
}

// create new login object
let login = new Login("wei@example.com", "password", "admin");

// protected
class Auth {
  private _isLoggedIn: boolean = false;
  constructor(public mail: string, protected password: string) {}
  login() {
    this._isLoggedIn =
      this.password === "password" && this.mail === "wei@example.com";
  }
  get loginStatus(): boolean {
    return this._isLoggedIn;
  }
}

class Profile extends Auth {
  set updateMail(mail: string) {
    if (this.loginStatus) {
      this.mail = mail;
    } else {
      throwError("You must login first");
    }
  }
  get forgotPassword(): string {
    // only can access protected property in child class
    return this.password;
  }
}

// Interface
interface UserInterface {
  name: string;
  mail: string;
  password: string;
}
interface LoginInterface {
  login(): void;
  logout(): void;
  checkLoginStatus(): boolean;
}

// class implements interface

class User2 implements UserInterface, LoginInterface {
  private _isLoggedIn: boolean = false;
  constructor(
    public name: string,
    public mail: string,
    public password: string
  ) {}
  login(): void {
    this._isLoggedIn =
      this.password === "password" && this.mail === "wei@example.com";
  }
  logout(): void {
    this._isLoggedIn = false;
  }
  checkLoginStatus(): boolean {
    return this._isLoggedIn;
  }
}

// abstract class
abstract class basicUser {
  private _isLoggedIn: boolean = false;
  constructor(
    public name: string,
    public mail: string,
    protected password: string
  ) {}
  abstract checkLoginStatus(): boolean;
  abstract login(): void;
  logout(): void {
    this._isLoggedIn = false;
  }
}

// can't create object of abstract class
// let john = new basicUser("John", "email", "password");

// Generics
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

let threeX = createArray<string>(3, "x"); // ['x', 'x', 'x']

// Generic with interface
interface Info {
  id: number;
}
function createFakeInfo<T extends Info>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = { ...value, id: i };
  }
  return result;
}

let testInfos = createFakeInfo(3, { id: 0, name: "John" });

// Type narrowing
function printId(id: number | string | any[] | any) {
  if (typeof id === "number") {
    console.log(id.toString());
  } else if (id && typeof id === "string") {
    console.log(id);
  } else if (id && id.id != undefined) {
    console.log(id.id);
  } else if (id && Array.isArray(id)) {
    id.forEach((item) => {
      if (item.id != undefined) {
        console.log(item.id);
      }
    });
  }
}

