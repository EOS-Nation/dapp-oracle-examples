export interface GetTableRows<T> {
  rows: T[],
  more: string,
}

export interface Authorization {
  actor: string
  permission: string
}

export interface Action {
  account: string
  name: string
  authorization: Authorization[]
  data: any
}