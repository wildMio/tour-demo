export interface Vehicle {
  name: string;
  department: string;
  equipment: {[prop: string]: string};
  contactPerson: {name: string, phone: string};
}
