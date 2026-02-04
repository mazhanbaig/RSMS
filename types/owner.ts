export interface Owner{
    id: string,
    createdAt:any,
    agentUid: string,
    agentName: string,

    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    
    status: "active" | "deal-Done" | "lost",
    notes: string,
}