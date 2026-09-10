import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { CardComponent, CardContentComponent, CardHeaderComponent } from '../../shared/components/card/card.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Archived';
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    TableComponent,
    ButtonComponent,
    BadgeComponent,
    FormsModule,
    ModalComponent,
  ],
  template: `
    <div class="flex-1 space-y-4">

      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Products</h1>
          <p class="text-muted-foreground mt-1">
            Manage your store inventory, pricing, and availability.
          </p>
        </div>
        <div class="flex gap-2">
          <app-button variant="outline">Export</app-button>
          <app-button (click)="openAddModal()">
            <svg lucideIcon="plus" class="mr-2 h-4 w-4"></svg>
            Add Product
          </app-button>
        </div>
      </div>

      <!-- Main Content Card -->
      <app-card>
        <app-card-header class="pb-3 border-b">
           <div class="flex flex-col gap-4">

             <!-- Tab Filter Row -->
             <div class="flex items-center gap-4 border-b pb-1">
                @for (tab of statusTabs; track tab) {
                  <button
                    (click)="selectedStatus.set(tab)"
                    class="pb-2 text-sm font-medium transition-colors hover:text-foreground relative"
                    [class]="selectedStatus() === tab ? 'text-foreground' : 'text-muted-foreground'"
                  >
                    {{ tab }}
                    @if (selectedStatus() === tab) {
                      <div class="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
                    }
                  </button>
                }
             </div>

             <!-- Core Filter Controls -->
             <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-1">
               <div class="flex items-center gap-2 border rounded-md px-3 bg-muted/30 shadow-sm sm:w-[350px]">
                 <svg lucideIcon="search" class="h-4 w-4 text-muted-foreground shrink-0"></svg>
                 <input
                   type="text"
                   class="w-full bg-transparent border-0 h-9 text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground"
                   placeholder="Search products by names or SKUs..."
                   [value]="searchQuery()"
                   (input)="onSearchInput($event)"
                 >
               </div>

               <div class="flex gap-2 w-full sm:w-auto">
                 <select
                   (change)="onCategoryChange($event)"
                   class="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                 >
                   @for (cat of categories; track cat) {
                     <option [value]="cat" [selected]="selectedCategory() === cat">{{ cat }}</option>
                   }
                 </select>

                 <app-button variant="outline" class="h-9 shrink-0 gap-2">
                   <svg lucideIcon="filter" class="h-4 w-4"></svg>
                   <span class="sr-only sm:not-sr-only">More Filters</span>
                 </app-button>
               </div>
             </div>
           </div>
        </app-card-header>

        <app-card-content class="p-0">
          <app-table
            [data]="filteredProducts()"
            [columns]="columns"
            [searchQuery]="searchQuery()"
            [pageSize]="6">

            <ng-template #cellTemplate let-row let-col="col">

              @if (col.key === 'product') {
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0 border overflow-hidden relative">
                    <!-- Showing a placeholder icon natively, mimicking image error / placeholder state -->
                    <svg lucideIcon="image" class="h-5 w-5 text-muted-foreground/50"></svg>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-medium text-foreground hover:underline cursor-pointer">{{ row.name }}</span>
                    <span class="text-[0.8rem] text-muted-foreground flex items-center gap-1">
                      <svg lucideIcon="tag" class="h-3 w-3"></svg>
                      {{ row.sku }}
                    </span>
                  </div>
                </div>
              }

              @else if (col.key === 'status') {
                <app-badge
                  [variant]="row.status === 'Active' ? 'default' : row.status === 'Archived' ? 'secondary' : 'outline'">
                  {{ row.status }}
                </app-badge>
              }

              @else if (col.key === 'price') {
                <span class="font-medium">{{ row.price | currency }}</span>
              }

              @else if (col.key === 'stock') {
                 <div class="flex items-center gap-2">
                   @if (row.stock === 0) {
                     <span class="flex h-2 w-2 rounded-full bg-destructive"></span>
                     <span class="text-sm font-medium text-destructive">Out of stock</span>
                   } @else if (row.stock < 10) {
                     <span class="flex h-2 w-2 rounded-full bg-orange-400"></span>
                     <span class="text-sm">Low stock ({{row.stock}})</span>
                   } @else {
                     <span class="text-sm">{{ row.stock }} in stock</span>
                   }
                 </div>
              }

              @else if (col.key === 'actions') {
                <div class="flex items-center gap-2">
                  <button (click)="openEditModal(row)" class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Edit">
                    <svg lucideIcon="edit" class="h-4 w-4"></svg>
                  </button>
                  <button class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="More">
                    <svg lucideIcon="more-horizontal" class="h-4 w-4"></svg>
                  </button>
                </div>
              }

              @else {
                {{ row[col.key] }}
              }
            </ng-template>
          </app-table>
        </app-card-content>
      </app-card>

      <!-- Add Product Modal -->
      <app-modal
        [isOpen]="isAddModalOpen()"
        (close)="closeAddModal()"
        [title]="editingProductId() ? 'Edit Product' : 'Add New Product'"
      >
        <div class="grid gap-4 py-4 cursor-default text-left">
          
          <div class="grid gap-2">
            <label for="name" class="text-sm font-medium leading-none">Product Name <span class="text-destructive">*</span></label>
            <input
              id="name"
              [(ngModel)]="newProductName"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="e.g. Mechanical Keyboard"
            />
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <label for="sku" class="text-sm font-medium leading-none">SKU <span class="text-destructive">*</span></label>
              <input
                id="sku"
                [(ngModel)]="newProductSKU"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="PROD-001"
              />
            </div>
            <div class="grid gap-2">
              <label for="category" class="text-sm font-medium leading-none">Category</label>
              <select
                id="category"
                [(ngModel)]="newProductCategory"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Electronics">Electronics</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Home & Garden">Home & Garden</option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="grid gap-2">
              <label for="price" class="text-sm font-medium leading-none">Price ($)</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                [(ngModel)]="newProductPrice"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div class="grid gap-2">
              <label for="stock" class="text-sm font-medium leading-none">Initial Stock qty</label>
              <input
                id="stock"
                type="number"
                min="0"
                [(ngModel)]="newProductStock"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div class="grid gap-2">
            <label for="status" class="text-sm font-medium leading-none">Initial Status</label>
            <select
              id="status"
              [(ngModel)]="newProductStatus"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Active">Active (Published)</option>
              <option value="Draft">Draft (Hidden)</option>
            </select>
          </div>

        </div>
        <div modal-footer class="mt-4 sm:mt-0 flex w-full justify-end gap-2">
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" (click)="closeAddModal()">Cancel</button>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed" (click)="saveProduct()" [disabled]="!newProductName() || !newProductSKU()">{{ editingProductId() ? 'Save Changes' : 'Add Product' }}</button>
        </div>
      </app-modal>
    </div>
  `
})
export class ProductsComponent {


  // Modal State
  isAddModalOpen = signal(false);
  newProductName = signal('');
  newProductSKU = signal('');
  newProductCategory = signal('Electronics');
  newProductPrice = signal<number>(0);
  newProductStock = signal<number>(0);
  newProductStatus = signal<'Active' | 'Draft' | 'Archived'>('Draft');

  editingProductId = signal<string | null>(null);

  openAddModal() {
    this.editingProductId.set(null);
    this.resetForm();
    this.isAddModalOpen.set(true);
  }

  openEditModal(product: Product) {
    this.editingProductId.set(product.id);
    this.newProductName.set(product.name);
    this.newProductSKU.set(product.sku);
    this.newProductCategory.set(product.category);
    this.newProductPrice.set(product.price);
    this.newProductStock.set(product.stock);
    this.newProductStatus.set(product.status);
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
    setTimeout(() => this.resetForm(), 200);
  }

  resetForm() {
    this.editingProductId.set(null);
    this.newProductName.set('');
    this.newProductSKU.set('');
    this.newProductCategory.set('Electronics');
    this.newProductPrice.set(0);
    this.newProductStock.set(0);
    this.newProductStatus.set('Draft');
  }

  saveProduct() {
    if (!this.newProductName() || !this.newProductSKU()) return;

    const editId = this.editingProductId();
    
    if (editId) {
      this.products.update(list => list.map(p => {
        if (p.id === editId) {
          return {
            ...p,
            name: this.newProductName(),
            sku: this.newProductSKU(),
            category: this.newProductCategory(),
            price: this.newProductPrice(),
            stock: this.newProductStock(),
            status: this.newProductStatus() 
          };
        }
        return p;
      }));
    } else {
      const newProd: Product = {
        id: Math.random().toString(36).substring(2, 9),
        name: this.newProductName(),
        sku: this.newProductSKU(),
        category: this.newProductCategory(),
        price: this.newProductPrice(),
        stock: this.newProductStock(),
        status: this.newProductStatus(),
        image: ''
      };
      this.products.update(list => [newProd, ...list]);
    }
    
    this.closeAddModal();
  }

  searchQuery = signal('');
  selectedStatus = signal<'All' | 'Active' | 'Draft' | 'Archived'>('All');
  selectedCategory = signal<string>('All Categories');

  statusTabs = ['All', 'Active', 'Draft', 'Archived'] as const;
  categories = ['All Categories', 'Electronics', 'Apparel', 'Accessories', 'Home & Garden'];

  columns = [
    { key: 'product', label: 'Product' },
    { key: 'status', label: 'Status' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Inventory' },
    { key: 'actions', label: 'Actions' }
  ];

  // Mock Products Database
  products = signal<Product[]>([
    { id: '1', name: 'Premium Wireless Headphones', sku: 'AUDIO-001', category: 'Electronics', price: 299.99, stock: 45, status: 'Active', image: '' },
    { id: '2', name: 'Mechanical Keyboard Pro', sku: 'COMP-042', category: 'Electronics', price: 149.50, stock: 8, status: 'Active', image: '' },
    { id: '3', name: 'Ergonomic Office Chair', sku: 'FURN-015', category: 'Home & Garden', price: 199.00, stock: 0, status: 'Archived', image: '' },
    { id: '4', name: 'USB-C Hub Multiport Adapter', sku: 'COMP-050', category: 'Accessories', price: 45.00, stock: 124, status: 'Active', image: '' },
    { id: '5', name: 'Cotton Minimalist T-Shirt', sku: 'APP-012', category: 'Apparel', price: 24.00, stock: 200, status: 'Active', image: '' },
    { id: '6', name: 'Smart Home Hub', sku: 'ELEC-993', category: 'Electronics', price: 129.99, stock: 23, status: 'Draft', image: '' },
    { id: '7', name: 'Leather Messenger Bag', sku: 'ACC-082', category: 'Accessories', price: 89.00, stock: 4, status: 'Active', image: '' },
    { id: '8', name: 'Desk Planter Set', sku: 'HOME-112', category: 'Home & Garden', price: 34.50, stock: 15, status: 'Draft', image: '' },
  ]);

  // Derived Signal computed by combining multiple constraints
  filteredProducts = computed(() => {
    let result = this.products();

    // 1. Filter by Status Tab
    if (this.selectedStatus() !== 'All') {
      result = result.filter(p => p.status === this.selectedStatus());
    }

    // 2. Filter by Category Dropdown
    if (this.selectedCategory() !== 'All Categories') {
      result = result.filter(p => p.category === this.selectedCategory());
    }

    // (Global Search Filtering is handled automatically by passing searchQuery directly to the TableComponent)

    return result;
  });

  onSearchInput(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }
}
