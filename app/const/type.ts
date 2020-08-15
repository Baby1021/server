export interface LoveListResponse {
  id: number
  content: string
  images: string[]
  remind: boolean
  user: UserResponse
  comments: Array<{
    content: string
    created: string
    user: UserResponse
  }>
  created: string
}

export interface UserResponse {
  userId: string
  avatar: string
  name: string
  loverId: string
}

