import { z } from 'zod';

export class Page {
  static readonly MAX = Number.MAX_SAFE_INTEGER;
  static readonly MIN = 1;
  static readonly schema = z.number().gte(Page.MIN).lte(Page.MAX).int();

  constructor(private page: number) {}

  static from(value: number) {
    return new Page(this.schema.parse(value));
  }

  get() {
    return this.page;
  }

  set(value: number) {
    this.page = Page.schema.parse(value);
  }
}

export class PageSize {
  static readonly MIN = 10;
  static readonly MAX = 100;
  static readonly schema = z.number().int().gte(PageSize.MIN).lte(PageSize.MAX);

  constructor(private value: number) {}

  static from(value: number) {
    return new PageSize(this.schema.parse(value));
  }

  get() {
    return this.value;
  }

  set(value: number) {
    this.value = PageSize.schema.parse(value);
  }
}

class PagePaginator {
  constructor(
    private page: Page,
    private size: PageSize,
  ) {}

  next() {
    return this.page.set(Math.min(Page.MAX, this.page.get() + 1));
  }

  prev() {
    return this.page.set(Math.max(Page.MIN, this.page.get() - 1));
  }

  getPage() {
    return this.page.get();
  }

  getPageSize() {
    return this.size.get();
  }
}
