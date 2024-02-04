export interface AuthModel {
    token: string
    api_token: string
    _id?: string
    refreshToken?: string
    role?: any
    person?: any
    office?: any
    department?: any
    company?: any
}

export interface UserAddressModel {
    addressLine: string
    city: string
    state: string
    postCode: string
}

export interface UserCommunicationModel {
    email: boolean
    sms: boolean
    phone: boolean
}

export interface UserEmailSettingsModel {
    emailNotification?: boolean
    sendCopyToPersonalEmail?: boolean
    activityRelatesEmail?: {
        youHaveNewNotifications?: boolean
        youAreSentADirectMessage?: boolean
        someoneAddsYouAsAsAConnection?: boolean
        uponNewOrder?: boolean
        newMembershipApproval?: boolean
        memberRegistration?: boolean
    }
    updatesFromKeenthemes?: {
        newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
        tipsOnGettingMoreOutOfKeen?: boolean
        thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
        newsAboutStartOnPartnerProductsAndOtherServices?: boolean
        tipsOnStartBusinessProducts?: boolean
    }
}

export interface UserSocialNetworksModel {
    linkedIn: string
    facebook: string
    twitter: string
    instagram: string
}

export interface UserModel {
    id: number
    username: string
    password: string | undefined
    email: string
    first_name?: string
    last_name?: string
    fullname?: string
    occupation?: string
    companyName?: string
    phone?: string
    role?: any
    person?: any
    pic?: string
    language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
    timeZone?: string
    website?: 'https://keenthemes.com'
    emailSettings?: UserEmailSettingsModel
    auth?: AuthModel
    communication?: UserCommunicationModel
    address?: UserAddressModel
    socialNetworks?: UserSocialNetworksModel
}
