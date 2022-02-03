import {Igreja} from '../../model/Igreja'
import { IIgrejaRepository, ICreateIgrejaDTO, IUpdateIgrejaDTO} from '../IIgrejaRepository'


class IgrejaRepository implements IIgrejaRepository {

    private igrejas: Igreja[];

    private static INSTANCE: IgrejaRepository;

    private constructor() {
        this.igrejas = [];
    }

    public static getInstance(): IgrejaRepository {
        if(!IgrejaRepository.INSTANCE) {
            IgrejaRepository.INSTANCE = new IgrejaRepository()
        }

        return IgrejaRepository.INSTANCE
    }

    findByRI(ri: string): Igreja {
        const igreja = this.igrejas.find((igreja) => igreja.ri === ri);
        return igreja
    }

    findByID(id: string): Igreja {
        const igreja = this.igrejas.find((igreja) => igreja.id === id);
        return igreja
    }

    list(): Igreja[] {
        return this.igrejas;
    }   

    create(data: ICreateIgrejaDTO): void {
        const igreja = new Igreja();
        Object.assign(igreja, {
            ...data
        })

        this.igrejas.push(igreja)
    }

    update(data: IUpdateIgrejaDTO): void {
        const {id} = data
        const igrejaToUpdate = this.igrejas.find((igreja) => igreja.id === id);

        const index = this.igrejas.indexOf(igrejaToUpdate)

        const igreja = new Igreja()

        Object.assign(igreja, {
            ...data,
            updated_by: 'admin',
            updated_at: new Date()
        })

        this.igrejas.splice(index, 1, igreja)
    
    }

    delete(ri: string): void {
        const igrejaToDelete = this.igrejas.find((igreja) => igreja.ri === ri);
        const index = this.igrejas.indexOf(igrejaToDelete)

        if(!igrejaToDelete) {
            throw new Error("igreja não existe")
        }

        this.igrejas.splice(index, 1);
    }
}


export {IgrejaRepository}