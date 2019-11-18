import { MessageService } from './message.service';
describe('Message service', () => {
  let service;
  beforeEach(() => {
    service = new MessageService();
  });
  it('should have no message in the start', () => {
    expect(service.messages.length).toBe(0);
  });
  it('should add message', () => {
    service.add('add message');
    expect(service.messages.length).toBe(1);
  });
  it('should clear message', () => {
    service.add('add message');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});