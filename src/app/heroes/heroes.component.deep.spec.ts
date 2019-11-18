import { HeroService } from './../hero.service';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';


describe('heroes component deep test', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes =  [
    { id: 1, name: 'Adaeze', strength: 10 },
    { id: 2, name: 'Lily', strength: 10 },
    { id: 3, name: 'Bose', strength: 10 },
  ];

  beforeEach(() => {

    mockHeroService =jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a hero component', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();
    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentDebugElements.length).toEqual(3);
    expect(heroComponentDebugElements[0].componentInstance.hero.name).toEqual('Adaeze');
    for(let i = 0; i < heroComponentDebugElements.length; i++) {
      expect(heroComponentDebugElements[i].componentInstance.hero).toEqual(heroes[i])
    }
  })
});