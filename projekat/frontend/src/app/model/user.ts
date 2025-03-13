import { PrivatnaBasta } from "./privatnaBasta";
import { RestoranskaBasta } from "./restoranskaBasta";

export class User{
    ime: string;
    prezime: string;
    pol: string;
    adresa: string;
    kontakt_telefon: number;
    email_adresa: string;
    profilna_slika: string;
    broj_kreditne_kartice: number;
    username: string;
    password: string;
    tip: string;
    works: boolean;
    isActive: boolean;
    privatneBaste: PrivatnaBasta[];
    restoranskeBaste: RestoranskaBasta[];
    imeFirme: string;
    
}