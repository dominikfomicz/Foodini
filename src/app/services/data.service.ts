import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public items: any = [];

  constructor() {
    this.items = [
        { title: "PIZZA HUT" },
        { title: "ZDROWA KROWA" },
        { title: "PUB OSTRÓWEK" },
        { title: "SHANTI" },
        { title: "TULSI" },
        { title: "KOFEINA 2.0x" },
        { title: "SMAKOBAO" },
        { title: "SAN ESCOBAR" },
        { title: "TYLKO PIZZA" },
        { title: "FRYTKARNIA" },
        { title: "FABUŁA" },
        { title: "KAISEKI" },
        { title: "ORIGAMI" },
        { title: "OLIVKA" },
        { title: "VIRTUAL CAFE" },
        { title: "MASKA" },
        { title: "OLESKA 102" },
        { title: "KARTOFLOVE PLACKI" },
        { title: "CASCARA" },
        { title: "OLIVKA" },
        { title: "TRYPOLIS KEBAB" },
        { title: "PIETRO PAN PIZZA" },
        { title: "GIUSEPPE CHMIELOWICE" },
        { title: "GIUSEPPE" },
        { title: "LAVENDA" },
        { title: "ZEBRA" },
        { title: "REWOLWER" },
        { title: "PUB OPOLE GŁÓWNE" },
      ];
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}