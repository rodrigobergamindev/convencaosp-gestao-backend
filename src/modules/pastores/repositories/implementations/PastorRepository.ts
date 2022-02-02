import {Pastor} from '../../model/Pastor'
import { IPastorRepository, ICreatePastorDTO, IUpdatePastorDTO} from '../IPastorRepository'


class PastorRepository implements IPastorRepository {

    private pastores: Pastor[];

    private static INSTANCE: PastorRepository;

    private constructor() {
        this.pastores = [];
    }

    public static getInstance(): PastorRepository {
        if(!PastorRepository.INSTANCE) {
            PastorRepository.INSTANCE = new PastorRepository()
        }

        return PastorRepository.INSTANCE
    }

    findByRM(rm: string): Pastor {
        const pastor = this.pastores.find((pastor) => pastor.rm === rm);
        return pastor
    }

    list(): Pastor[] {
        return this.pastores;
    }   

    create(data: ICreatePastorDTO): void {
        const pastor = new Pastor();
        Object.assign(pastor, {
            ...data
        })

        this.pastores.push(pastor)
    }

    update(data: IUpdatePastorDTO): void {
        const {rm} = data
        let pastorToUpdate = this.pastores.find((pastor) => pastor.rm === rm);

        if(!pastorToUpdate) {
            throw new Error("Pastor não existe")
        }

        const index = this.pastores.indexOf(pastorToUpdate)

        const pastor = new Pastor()

        Object.assign(pastor, {
            ...data,
            updated_by: 'admin',
            updated_at: new Date()
        })

        this.pastores.splice(index, 1, pastor)
    
    }

    delete(rm: string): void {
        const pastorToDelete = this.pastores.find((pastor) => pastor.rm === rm);
        const index = this.pastores.indexOf(pastorToDelete)

        if(!pastorToDelete) {
            throw new Error("pastor não existe")
        }

        this.pastores.splice(index, 1);
    }
}


export {PastorRepository}