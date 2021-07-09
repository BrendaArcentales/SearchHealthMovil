export interface medicalCenter{
    id?:string,
    photo:string,
    name:string,
    email:string,
    type:string,
    sector:string,
    days:string,
    start_time:string,
    end_time:string,
    location:{
        address:string,
        latitude:string,
        longitude:string
    },
    social_media:{
        facebook:string,
        instagram:string,
        website:string
    },
    specialties:[]
    
}