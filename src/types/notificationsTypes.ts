export interface initialNotificationsType {
  items: notificationType[],
  loading: boolean,
  error: null,
}

export interface notificationType {
  id: string,
  text: string,
  is_read: boolean,
  user_id: string
}
