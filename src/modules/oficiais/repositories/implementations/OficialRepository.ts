import {Oficial} from '../../model/Oficial'
import { IOficialRepository, ICreateOficialDTO, IUpdateOficialDTO} from '../IOficialRepository'
import {db} from '../../../../services/firestore'
import { FieldValue } from 'firebase-admin/firestore';


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


        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc()

        await oficialRef.set({ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto})
        await observacaoRef.set({
            observacoes: observacao
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