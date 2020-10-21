export class CustomerModel {
  _id?: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export class getCustomerResponseModel {
  customers: CustomerModel[];
}

