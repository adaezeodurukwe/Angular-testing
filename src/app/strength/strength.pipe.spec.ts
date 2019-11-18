import { StrengthPipe } from './strength.pipe';
describe('StrengthPipe', () => {
  it('should display weak when number is 5', () => {
    const pipe = new StrengthPipe()

    expect(pipe.transform(5)).toEqual('5 (weak)')
  })
  it('should display strong when number is 5', () => {
    const pipe = new StrengthPipe()

    expect(pipe.transform(10)).toEqual('10 (strong)')
  })
});
