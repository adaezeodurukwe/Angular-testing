import { HeroService } from './../hero.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component, Directive } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class StubRouterLinkDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('heroes component deep test', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  const heroes =  [
    { id: 1, name: 'Adaeze', strength: 10 },
    { id: 2, name: 'Lily', strength: 10 },
    { id: 3, name: 'Bose', strength: 10 },
  ];

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        StubRouterLinkDirective
      ],
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
    for (let i = 0; i < heroComponentDebugElements.length; i++) {
      expect(heroComponentDebugElements[i].componentInstance.hero).toEqual(heroes[i]);
    }
  });

  it('should call heroservice.deleteHero when delete button is clicked', () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', {stopPropagation: () => {}});
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    // heroComponents[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
  });

  it('should add a new hero when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const name = 'venom';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 4 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    const routerLink = heroComponents[0]
      .query(By.directive(StubRouterLinkDirective))
      .injector.get(StubRouterLinkDirective);

  heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
  expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
