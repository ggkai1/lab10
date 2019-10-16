import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  section = 1;
  movieName: string = "";
  year: number = 0;
  movieId: string = "";
  actor: string = ""; 
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  i = 0;
  constructor(private dbService: DatabaseService) {}
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((moviedata: any[]) => {
      this.moviesDB = moviedata;
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.movieName, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // Update a Movie
  onSelectUpdate(item) {
    this.movieName = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onSelectActor(item1) {
    this.fullName = item1.name;
    this.bYear = item1.bYear;
    this.actorId = item1._id;
  }
  onUpdateMovie() {
    let obj = { "id":this.movieId};
    this.dbService.addMovie(this.actorId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteYear(){
    
    for(this.i=0; this.i<=this.moviesDB.length;this.i++ ){
      if (this.moviesDB[this.i].year < this.year){
        
        
        
        this.dbService.deleteMovie(this.moviesDB[this.i]._id).subscribe(result => {
          this.onGetMovies();
        });
      }
    }

  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();this.onGetActors()
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.movieName = "";
    this.year = 0;
    this.movieId = "";
  }
}