export interface initialNotificationsType {
  items: notificationType[],
  loading: boolean,
  error: null,
}

export interface notificationType {
  id: string,
  text: string,
  is_read: boolean,
  company_member_id: string
}
