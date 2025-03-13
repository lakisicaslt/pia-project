import { PrivatnaBasta } from "./privatnaBasta";
import { RestoranskaBasta } from "./restoranskaBasta";
import { User } from "./user";
import { Usluga } from "./usluga";

export class Firma{
    ime: string;
    adresa: string;
    usluge: Usluga[];
    lokacija: string;
    kontakt_osoba: string;
    zaposleni: User[];
    datum_pocetka: Date;
    datum_kraja: Date;
    privatneBaste: PrivatnaBasta[];
    restoranskeBaste: RestoranskaBasta[];

}