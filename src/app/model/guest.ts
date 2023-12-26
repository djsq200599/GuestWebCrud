export interface Guest {
    firstname: string;
    lastname: string;
    rut:number;
    date: string;
    phone: number;
    email: number;
    tower: "A" | "B";
    towerNumber: number;
    description: string;
}

export interface GuestID extends Guest {
    id?: number;
}

export interface GuestPartial extends Partial<Guest> {

}