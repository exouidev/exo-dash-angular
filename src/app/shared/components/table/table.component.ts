import { Component, input, computed, signal, TemplateRef, contentChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full relative overflow-auto rounded-md border">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            @for (col of columns(); track col.key) {
              <th 
                class="h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:text-foreground"
                (click)="sort(col.key)"
              >
                <div class="flex items-center gap-1">
                  {{ col.label }}
                  @if (sortKey() === col.key) {
                    <span class="text-xs">{{ sortDirection() === 'asc' ? '↑' : '↓' }}</span>
                  }
                </div>
              </th>
            }
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          @for (row of paginatedData(); track row.id) {
            <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              @for (col of columns(); track col.key) {
                <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <ng-container *ngTemplateOutlet="cellTemplate() ? cellTemplate() : defaultCell; context: { $implicit: row, col: col }"></ng-container>
                  <ng-template #defaultCell>
                    {{ row[col.key] }}
                  </ng-template>
                </td>
              }
            </tr>
          } @empty {
            <tr>
              <td [attr.colspan]="columns().length" class="p-4 text-center text-muted-foreground whitespace-nowrap">
                No results.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        Showing {{ (currentPage() - 1) * pageSize() + (paginatedData().length ? 1 : 0) }} to
        {{ (currentPage() - 1) * pageSize() + paginatedData().length }} of
        {{ filteredAndSortedData().length }} entries
      </div>
      <div class="flex items-center space-x-2">
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
          [disabled]="currentPage() === 1"
          (click)="setPage(currentPage() - 1)"
        >
          Previous
        </button>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
          [disabled]="currentPage() === totalPages()"
          (click)="setPage(currentPage() + 1)"
        >
          Next
        </button>
      </div>
    </div>
  `
})
export class TableComponent {
  data = input<any[]>([]);
  columns = input<{key: string, label: string}[]>([]);
  searchQuery = input<string>('');
  pageSize = input<number>(5);
  
  cellTemplate = contentChild<TemplateRef<any>>('cellTemplate');

  sortKey = signal<string>('');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal<number>(1);

  filteredAndSortedData = computed(() => {
    let result = [...this.data()];
    const query = this.searchQuery().toLowerCase();

    // Filter
    if (query) {
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(query)
        )
      );
    }

    // Sort
    const key = this.sortKey();
    if (key) {
      result.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        
        if (valA < valB) return this.sortDirection() === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection() === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  });

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredAndSortedData().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredAndSortedData().length / this.pageSize()) || 1;
  });

  sort(key: string) {
    if (this.sortKey() === key) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1);
  }

  setPage(page: number) {
    this.currentPage.set(page);
  }
}
