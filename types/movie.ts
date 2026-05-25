interface BaseEntity{
    id: number;
    // createdAt: string;
}
interface BioEntity extends BaseEntity{
    firstName: string;
    lastName: string;
    birthDate?: string;
}
export interface IGenre extends BaseEntity{
    genreName: string;
}

export interface IActor extends BioEntity {
    photoUrl?: string;
    movieCount: number;
    
}

export interface IDirector extends BioEntity{}

export interface IMovie extends BaseEntity {
    title: string;
    description?: string;
    releaseYear?: number;
    posterUrl?: string;
    director?: IDirector;
    genres: IGenre[];
    actors: IActor[];
}