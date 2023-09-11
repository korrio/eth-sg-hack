import { PageableData } from '@/store/types/pageable';

export enum CREATOR_MENU {
  HOME,
  MEMBERSHIP,
  ABOUT,
}

export enum ACTION {
  CREATE,
  UPDATE,
  DELETE,
}

export const HTTP_STATUS_CODE = {
  CREATED: 201,
  OK: 200,
  UNAUTHORIZED: 401,
};

export const initialPageData: PageableData = {
  content: [],
  empty: false,
  first: false,
  last: false,
  number: 0,
  numberOfElements: 0,
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 0,
    paged: false,
    sort: {
      empty: false,
      sorted: false,
      unsorted: false,
    },
    unpaged: false,
  },
  size: 0,
  sort: {
    empty: false,
    sorted: false,
    unsorted: false,
  },
  totalElements: 0,
  totalPages: 0,
};
