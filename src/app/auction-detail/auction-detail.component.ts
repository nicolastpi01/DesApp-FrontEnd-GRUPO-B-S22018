import {Component, OnInit, Input, AfterContentInit, AfterViewInit} from '@angular/core';
import { Auction } from '../auction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuctionService }  from '../auction.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
    @Input() auction: Auction;
    @Input() map: Map;

  constructor(private route: ActivatedRoute, private auctionService: AuctionService, private location: Location) {}

  ngOnInit() {
    this.getAuction();
    this.showMap();
  }

  showMap() {

    this.map = new Map({
      view: new View({
        center: [50, 50],
        zoom: 5
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map'
    });
  }

  show_info(){
      console.log("fds");
  }

    getAuction(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.auctionService.getAuction(id)
        .subscribe(auction => this.auction = auction);
    };

    // Acá se realiza la oferta (con id_usuario, id_auction)

    // Actualizar una subasta, deberia hacerse desde este componente pero solo siendo el dueño de la subasta
    // de todas formas es una función rara editar una subasta porque una vez en progreso o con pujantes no deberias tener permiso para modificarla
    save() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.auctionService.updateAuction(id, this.auction)
        .subscribe(() => this.goBack());
    };

    goBack() {
        this.location.back();
    };

}
