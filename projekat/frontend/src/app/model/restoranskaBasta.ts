import { Usluga } from "./usluga";

export class RestoranskaBasta{

    datum_vreme: Date;
    kvadratura_baste: number;
    kvadratura_fontana: number;
    kvadratura_zelenilo: number;
    broj_inventar: number;
    tekst: string;
    usluge: Usluga[];
    datumZakazivanja: Date;
    imeFirme: string;
    brFontana: string;
    renoviranje: boolean;
    obradjen: boolean;
    procenaZavrsetka: Date;
    potvrdaOdrzavanja: boolean;

    
}