import {Oficial} from '../../model/Oficial'
import { IOficialRepository, ICreateOficialDTO, IUpdateOficialDTO} from '../IOficialRepository'
import {db} from '../../../../services/firestore'


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

    async convertDataToJson(data) {
        const dataConverted = await JSON.parse(JSON.stringify(data))
        return dataConverted
    }

    findByRO(ro: string): Oficial {
        const oficial = new Oficial()
        
        return oficial
    }

    findByID(id: string): Oficial {
        const oficial = this.oficiais.find((oficial) => oficial.id === id);
        return oficial
    }

    async list(): Promise<Oficial[]> {
        const docRef = await db.collection('oficiais')
        
        const data = await docRef.get()

        if(data.empty){
            return null
        }

       await data.forEach(doc => {
            const oficial = new Oficial()

                Object.assign(oficial, {
                     ...doc.data()
                 })

            this.oficiais.push(oficial)
        })

        return this.oficiais

    }   

    async create(data: ICreateOficialDTO): Promise<void> {

        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, observacao } = data

        
        
        const baseInformation = await this.convertDataToJson({ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto})
        
        await db.collection('Oficiais').doc(ro).set({
            ...baseInformation,
            observacao: observacao.map(obs => {
                return db.collection('observacao').add(JSON.parse(JSON.stringify(obs)))
            })
        })

        
    }

    async update(data: IUpdateOficialDTO): Promise<void> {
        const {ro} = data

        const oficialToUpdate = await db.collection('Oficiais').doc(ro)
        
        const dataConverted = JSON.parse(JSON.stringify(data))

       await oficialToUpdate.update(dataConverted)

        
    }

    delete(id: string): void {
        const oficialToDelete = this.oficiais.find((oficial) => oficial.id === id);
        const index = this.oficiais.indexOf(oficialToDelete)

        this.oficiais.splice(index, 1);
    }
}


export {OficialRepository}