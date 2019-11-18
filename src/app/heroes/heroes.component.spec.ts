import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
describe('Heroes component', () => {
  let herolist;
  let heroesComponent;
  let mockHeroService;

  beforeEach(() => {
    herolist = [
      { id: 1, name: 'Adaeze', strength: 10 },
      { id: 2, name: 'Lily', strength: 10 },
      { id: 3, name: 'Bose', strength: 10 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHero', 'addHero', 'deleteHero'])
    heroesComponent = new HeroesComponent(mockHeroService);
  });
  describe('delete', () => {
    it('should delete a hero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      heroesComponent.heroes = herolist;

      heroesComponent.delete(herolist[1])

      expect(heroesComponent.heroes.length).toBe(2);
      expect(mockHeroService.deleteHero).toHaveBeenCalled();
    })
  });
});