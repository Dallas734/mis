export interface RegisterScheme {
    email: string,
    password: string,
    passwordConfirm: string,
    doctorId?: number,
    role: string
}