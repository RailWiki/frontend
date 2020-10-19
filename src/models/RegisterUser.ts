export default class RegisterUserModel {
  public email = '';
  public password = '';
  public firstName = '';
  public lastName = '';

  constructor(email: string, password: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
