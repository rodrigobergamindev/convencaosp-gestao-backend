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

    findByID(id: string): Pastor {
        const pastor = this.pastores.find((pastor) => pastor.id === id);
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
        const {id} = data
        let pastorToUpdate = this.pastores.find((pastor) => pastor.id === id);

        const index = this.pastores.indexOf(pastorToUpdate)

        const pastor = new Pastor()

        Object.assign(pastor, {
            ...data,
            updated_by: 'admin',
            updated_at: new Date()
        })

        this.pastores.splice(index, 1, pastor)
    
    }

    delete(id: string): void {
        const pastorToDelete = this.pastores.find((pastor) => pastor.id === id);
        const index = this.pastores.indexOf(pastorToDelete)

        this.pastores.splice(index, 1);
    }
}


export {PastorRepository}