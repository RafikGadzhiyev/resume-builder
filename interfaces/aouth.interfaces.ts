export interface IGoogleOauthCredentials {
    email: string
    email_verified: boolean
    name: string
    given_name: string
    family_name: string
    iat?: number
    exp?: number
}