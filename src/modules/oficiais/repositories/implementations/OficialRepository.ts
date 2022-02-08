
import { IOficialRepository, ICreateOficialDTO, IUpdateOficialDTO} from '../IOficialRepository'
import {db} from '../../../../services/firestore'
import { DocumentData, FieldValue} from 'firebase-admin/firestore';
import { deletePhoto } from '../../../../services/photos';


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
        const batch = db.batch()
        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, igreja_sede, foto, observacao , anuidade, contato, endereco } = data
        

        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)
        const logRef = await oficialRef.collection('Logs').doc(ro)

     

            if(anuidade){
                batch.set(anuidadeRef, {
                   ...anuidade
                })
               }
        
                if(observacao){
                    batch.set(observacaoRef, {
                        data: observacao
                    })
                }
            
                batch.set(oficialRef, {
                    ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, igreja_sede
                })
        
                batch.set(enderecoRef, {
                    data: endereco
                })
        
                batch.set(contatoRef, {
                    data: contato
                })

                batch.set(logRef,  
                    {
                        operations: FieldValue.arrayUnion({
                            created_at: new Date(),
                            created_by: 'admin',
                            descricao: 'Criação de registro'
                        })
                    }
                )

                await batch.commit()
        
    }

    async update(data: IUpdateOficialDTO): Promise<void> {
        const batch = db.batch()

        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, observacao , anuidade, contato, endereco } = data

        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)
        const logRef = await oficialRef.collection('Logs').doc(ro)


            if(anuidade){
                batch.update(anuidadeRef, {
                    ...anuidade
                })
               }
        
                if(observacao){
                    batch.update(observacaoRef, {
                        data: observacao
                    })
                }
                
                batch.update(oficialRef, {
                    ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto
                })
                
        
                batch.update(enderecoRef, {
                    data: endereco
                })
        
                batch.update(contatoRef, {
                    data: contato
                })
        
                batch.update(logRef, {
                        operations: FieldValue.arrayUnion({
                            updated_at: new Date(),
                            descricao: 'Alteração de cadastro',
                            updated_by: 'admin'
                        })
                })

                await batch.commit()

        
    }

    async delete(ro: string): Promise<void> {

        const oficialRef = await db.collection('Oficiais').doc(ro)

        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)
        const logRef = await oficialRef.collection('Logs').doc(ro)

    

        const batch = db.batch()

    
                if((await observacaoRef.get()).data()){
                    batch.delete(observacaoRef)
                }

                if((await anuidadeRef.get()).data()){
                    batch.delete(anuidadeRef)
                }

                batch.delete(contatoRef)
                batch.delete(enderecoRef)
                batch.delete(oficialRef)
                batch.delete(logRef)
                
                await deletePhoto(`RO${ro}`)
                await batch.commit()
    }
}


export {OficialRepository}