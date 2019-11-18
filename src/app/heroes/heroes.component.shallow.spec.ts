import { HeroService } from './../hero.service';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Hero } from '../hero';


describe('heroes component shallow test', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes =  [
    { id: 1, name: 'Adaeze', strength: 10 },
    { id: 2, name: 'Lily', strength: 10 },
    { id: 3, name: 'Bose', strength: 10 }
  ];

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {

    mockHeroService =jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent)
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });
  it('should create one Li fro each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  })
});
