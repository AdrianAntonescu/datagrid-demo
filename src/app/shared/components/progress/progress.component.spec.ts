import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressComponent } from './progress.component';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('radius', 20);
    fixture.componentRef.setInput('progress', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor()', () => {
    it('should emit complete when progress is initialized at 100', () => {
      const emitSpy = spyOn(component.complete, 'emit');

      fixture.componentRef.setInput('progress', 100);
      fixture.detectChanges();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit complete when progress changes to 100', () => {
      const emitSpy = spyOn(component.complete, 'emit');

      fixture.componentRef.setInput('progress', 70);
      fixture.detectChanges();

      fixture.componentRef.setInput('progress', 100);
      fixture.detectChanges();

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit complete when progress is below 100', () => {
      const emitSpy = spyOn(component.complete, 'emit');

      fixture.componentRef.setInput('progress', 99);
      fixture.detectChanges();

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('progress input transform', () => {
    it('should clamp progress above 100 to 100', () => {
      fixture.componentRef.setInput('progress', 140);
      fixture.detectChanges();

      expect(component.progress()).toBe(100);
    });

    it('should clamp progress below 0 to 0', () => {
      fixture.componentRef.setInput('progress', -25);
      fixture.detectChanges();

      expect(component.progress()).toBe(0);
    });
  });
});
