import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent<any>;
  let fixture: ComponentFixture<GridComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should emit initial pagination with current page 1 and actual page size', () => {
      fixture.componentRef.setInput('pageSize', 10);
      const emitSpy = spyOn(component.paginationChange, 'emit');

      component.ngOnInit();

      expect(emitSpy).toHaveBeenCalledWith({ currentPage: 1, pageSize: 10 });
    });
  });

  describe('getCellData()', () => {
    it('should format number values using Intl.NumberFormat', () => {
      const row = { amount: 12345 };
      const column: any = {
        property: () => 'amount',
      };

      const result = component.getCellData(row, column);

      expect(result).toBe(new Intl.NumberFormat().format(12345));
    });

    it('should return string values as text', () => {
      const row = { name: 'Alice' };
      const column: any = {
        property: () => 'name',
      };

      const result = component.getCellData(row, column);

      expect(result).toBe('Alice');
    });
  });

  describe('isColumnSortable()', () => {
    it('should return true when grid and column are sortable', () => {
      fixture.componentRef.setInput('sortable', true);
      const column: any = {
        sortable: () => true,
      };

      expect(component.isColumnSortable(column)).toBeTrue();
    });

    it('should return false when grid is not sortable', () => {
      fixture.componentRef.setInput('sortable', false);
      const column: any = {
        sortable: () => true,
      };

      expect(component.isColumnSortable(column)).toBeFalse();
    });
  });

  describe('getColumnSortDirection()', () => {
    it('should return NONE when there is no active sort', () => {
      const column: any = { name: () => 'Name' };

      expect(component.getColumnSortDirection(column)).toBe(
        component.SORT_DIRECTION.NONE,
      );
    });

    it('should return active direction for the currently sorted column', () => {
      fixture.componentRef.setInput('sortable', true);
      const column: any = {
        name: () => 'Name',
        sortable: () => true,
      };

      component.onSort(column);

      expect(component.getColumnSortDirection(column)).toBe(
        component.SORT_DIRECTION.ASC,
      );
    });
  });

  describe('onSort()', () => {
    it('should cycle sort direction ASC -> DESC -> NONE for the same column', () => {
      fixture.componentRef.setInput('sortable', true);
      const column: any = {
        name: () => 'Name',
        sortable: () => true,
      };
      const emitSpy = spyOn(component.sortChange, 'emit');

      component.onSort(column);
      component.onSort(column);
      component.onSort(column);

      expect(emitSpy.calls.count()).toBe(3);
      expect(emitSpy.calls.argsFor(0)[0]).toEqual({
        columnName: 'Name',
        direction: component.SORT_DIRECTION.ASC,
      });
      expect(emitSpy.calls.argsFor(1)[0]).toEqual({
        columnName: 'Name',
        direction: component.SORT_DIRECTION.DESC,
      });
      expect(emitSpy.calls.argsFor(2)[0]).toEqual({
        columnName: 'Name',
        direction: component.SORT_DIRECTION.NONE,
      });
    });
  });

  describe('onPaginationChange', () => {
    it('should emit the received pagination payload', () => {
      const emitSpy = spyOn(component.paginationChange, 'emit');
      const pagination = { currentPage: 2, pageSize: 20 };

      component.onPaginationChange(pagination);

      expect(emitSpy).toHaveBeenCalledWith(pagination);
    });
  });
});
