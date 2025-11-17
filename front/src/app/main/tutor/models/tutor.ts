import { Pet } from "../../pet/models/pet";

export interface Tutor {
    id?: number;
    nome?: string;
    contato?: string;
    endereco?: string;
    pets?: Pet[];
}
