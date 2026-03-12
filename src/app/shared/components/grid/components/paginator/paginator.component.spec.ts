import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalItems', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the max page size option when pageSize is null', () => {
    fixture.componentRef.setInput('totalItems', 15);
    fixture.componentRef.setInput('pageSizeOptions', [5, 10, 20]);
    fixture.componentRef.setInput('pageSize', null);
    fixture.detectChanges();

    const select: HTMLSelectElement =
      fixture.nativeElement.querySelector('#pageSize');

    expect(select.value).toBe('20');
  });

  describe('onGoForward', () => {
    it('should emit pagination change when going forward', () => {
      fixture.componentRef.setInput('totalItems', 30);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const emitSpy = spyOn(component.paginationChange, 'emit');

      component.onGoForward();

      expect(component.currentPage()).toBe(2);
      expect(emitSpy).toHaveBeenCalledWith({ currentPage: 2, pageSize: 10 });
    });
  });

  describe('onGoBack', () => {
    it('should emit pagination change when going back', () => {
      fixture.componentRef.setInput('totalItems', 30);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const emitSpy = spyOn(component.paginationChange, 'emit');

      component.onGoForward();
      component.onGoBack();

      expect(component.currentPage()).toBe(1);
      expect(emitSpy).toHaveBeenCalledWith({ currentPage: 1, pageSize: 10 });
    });
  });

  describe('onPageSizeChange', () => {
    it('should reset to first page and emit when page size changes', () => {
      fixture.componentRef.setInput('totalItems', 30);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const emitSpy = spyOn(component.paginationChange, 'emit');
      const event = { target: { value: '20' } } as unknown as Event;

      component.onGoForward();
      component.onPageSizeChange(event);

      expect(component.currentPage()).toBe(1);
      expect(component.pageSize()).toBe(20);
      expect(emitSpy).toHaveBeenCalledWith({ currentPage: 1, pageSize: 20 });
    });

    it('should not emit when selected page size is unchanged', () => {
      fixture.componentRef.setInput('totalItems', 30);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const emitSpy = spyOn(component.paginationChange, 'emit');
      const event = { target: { value: '10' } } as unknown as Event;

      component.onPageSizeChange(event);

      expect(component.currentPage()).toBe(1);
      expect(component.pageSize()).toBe(10);
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
