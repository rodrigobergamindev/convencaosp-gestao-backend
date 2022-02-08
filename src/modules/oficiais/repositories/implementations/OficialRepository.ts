import {Oficial} from '../../model/Oficial'
import { IOficialRepository, ICreateOficialDTO, IUpdateOficialDTO} from '../IOficialRepository'
import {db} from '../../../../services/firestore'
import { DocumentData, FieldValue, Timestamp } from 'firebase-admin/firestore';


class OficialRepository implements IOficialRepository {

    private oficiais: DocumentData[];

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

    async findByRO(ro: string): Promise<DocumentData> {
        const oficialRef = await db.collection('Oficiais').doc(ro).get()
        const oficial = oficialRef.data()
        
        return oficial
    }


    async list(): Promise<DocumentData[]> {
        
        const docRef = await db.collection('Oficiais')
        
        const data = await docRef.get()
        
        if(data.empty){
            return null
        }

      await data.forEach(doc => {
          this.oficiais.push(doc.data())
        })

   
        return this.oficiais

    }   

    async create(data: ICreateOficialDTO): Promise<void> {

        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, observacao , anuidade, contato, endereco } = data


        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)

        await oficialRef.set({
            ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto,
            created_at: FieldValue.serverTimestamp()
        })

        await enderecoRef.set({
            ...endereco
        })

        await contatoRef.set({
            ...contato
        })

       if(anuidade){
        await anuidadeRef.set({
            ...anuidade
        })
       }

        if(observacao){
            await observacaoRef.set({
                ...observacao
            })
        }
        
    }

    async update(data: IUpdateOficialDTO): Promise<void> {
        
        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, observacao , anuidade, contato, endereco } = data

        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)

        await oficialRef.update({
            ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto,
            updated_at: FieldValue.serverTimestamp(),
            updated_by: 'admin'
        })
        

        await enderecoRef.update({
            ...endereco
        })

        await contatoRef.update({
            ...contato
        })

       if(anuidade){
        await anuidadeRef.update({
            ...anuidade
        })
       }

        if(observacao){
            await observacaoRef.update({
                ...observacao
            })
        }
       

        
    }

    async delete(ro: string): Promise<void> {

        const oficialRef = await db.collection('Oficiais').doc(ro)

        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)

        const batch = db.batch()

        try {
                if((await observacaoRef.get()).data()){
                    batch.delete(observacaoRef)
                }

                if((await anuidadeRef.get()).data()){
                    batch.delete(anuidadeRef)
                }

                batch.delete(contatoRef)
                batch.delete(enderecoRef)
                batch.delete(oficialRef)

                await batch.commit()
                console.log('Oficial excluído');
          } catch (e) {
            throw Error(e);
          }
    }
}


export {OficialRepository}