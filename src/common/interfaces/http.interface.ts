export interface IAuthUser {
  uuid: string,
  phone: string,
  nickName: string
}

export interface ITokenResponse {
  Authorization: string,
  user: IAuthUser
}
