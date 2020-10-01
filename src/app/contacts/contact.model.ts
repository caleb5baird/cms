export  class Contact {
  constructor(
    public id: string = "0",
    public name: string = "Name",
    public email: string = "Email Address",
    public phone: string = "Phone Number",
    public imageUrl: string = "assets/img/default-profile.png",
    public group: Contact[] = null
  ) {}
}
