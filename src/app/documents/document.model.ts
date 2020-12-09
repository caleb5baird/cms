export class Document {
  constructor(
    public id: string = "0",
    public name: string = "Name",
    public description: string = "Description",
    public url: string = "URL",
    public children: Document[] = null
  ) {}
  _id?: string;
}
