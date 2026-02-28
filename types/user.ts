export type User = {
  createdAt: string;          
  email: string;
  name: string;
  uid:string,
  photoURL: string;
  provider: "google" | string;
  subscription: {
    txnRef: string;
    expiryDate: string;      
    paymentMethod: string;    
    packageName: string;         
    status: "pending" | "active" | "expired";
    startAt: string;    
  };
};