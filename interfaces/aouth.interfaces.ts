export interface IAuthCredentials {
    id: string
    email: string
    given_name: string
    family_name: string
    full_name: string
    age: number
    iat?: number
    exp?: number
    created_at: number
}