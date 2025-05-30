export interface JwtToken {
  sub: string;
  memberId: string;
  memberName: string;
  iat: number;
  exp: number;
}
