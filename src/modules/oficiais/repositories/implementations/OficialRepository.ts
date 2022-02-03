import {Oficial} from '../../model/Oficial'
import { IOficialRepository, ICreateOficialDTO, IUpdateOficialDTO} from '../IOficialRepository'


class OficialRepository implements IOficialRepository {

    private oficiais: Oficial[];

    private static INSTANCE: OficialRepository;

    private constructor() {
        this.oficiais = [];
    }

    public static getInstance(): OficialRepository {
        if(!OficialRepository.INSTANCE) {
            OficialRepository.INSTANCE = new OficialRepository()
        }

        return OficialRepository.INSTANCE
    }

    findByRO(ro: string): Oficial {
        const oficial = this.oficiais.find((oficial) => oficial.ro === ro);
        return oficial
    }

    findByID(id: string): Oficial {
        const oficial = this.oficiais.find((oficial) => oficial.id === id);
        return oficial
    }

    list(): Oficial[] {
        return this.oficiais;
    }   

    create(data: ICreateOficialDTO): void {
        const oficial = new Oficial();
        Object.assign(oficial, {
            ...data
        })
        this.oficiais.push(oficial)
    }

    update(data: IUpdateOficialDTO): void {
        const {id} = data
        let oficialToUpdate = this.oficiais.find((oficial) => oficial.id === id);

        const index = this.oficiais.indexOf(oficialToUpdate)

        const oficial = new Oficial()

        Object.assign(oficial, {
            ...data,
            updated_by: 'admin',
            updated_at: new Date()
        })

        this.oficiais.splice(index, 1, oficial)
    
    }

    delete(id: string): void {
        const oficialToDelete = this.oficiais.find((oficial) => oficial.id === id);
        const index = this.oficiais.indexOf(oficialToDelete)

        if(!oficialToDelete) {
            throw new Error("Oficial não existe")
        }

        this.oficiais.splice(index, 1);
    }
}


export {OficialRepository}